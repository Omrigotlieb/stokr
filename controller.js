/**
 * Created by omrigo on 18/07/2017.
 */
window.Stokr.Ctrl = (function () {
  'use strict';
  window.Stokr = window.Stokr || {};
  const Model = window.Stokr.Model;
  const View = window.Stokr.View;

  let states = Model.getState();
  // let stockMarketData = states.stocks;

  const stockButtonEnums = states.ui.stockButtonEnums;
  const stockButtonDefaultLocation = states.ui.stockButtonDefaultLocation;


  window.Stokr.Ctrl = {
    // ctrlAddEventListenerForStockChangesButtons,
    swapLocationOfStocksDown,
    getEnum,
    fetchSearch,
    getStockEnums,
    getStockButtonDefaultLocation,
    getState,
    setStockButtonDefaultLocation,
    handleClickOnApplyFilter,
    hashchangeHandler,
    saveUIStateToLocalStorage,
    addStocksToUserStocks,
    fetchStocks,
    init
  }

  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i,
          el = this;
        do {
          i = matches.length;
          while (--i >= 0 && matches.item(i) !== el) {
          }
          ;
        } while ((i < 0) && (el = el.parentElement));
        return el;
      };
  }

  function getState() {
    return states;
  }

  function setStockButtonDefaultLocation(location) {
    states.ui.stockButtonDefaultLocation = location;
  }

  function getStockEnums() {
    return stockButtonEnums;
  }

  function getStockButtonDefaultLocation() {
    return stockButtonDefaultLocation;
  }

  function getEnum(stock, enumLocation) {
    switch (enumLocation) {
      case 0:
        return parseFloat(stock.realtime_chg_percent).toFixed(2) + '%';
      case 1:
        return parseFloat(stock.Change).toFixed(2);
      case 2:
        return parseFloat(stock.MarketCapitalization.slice(0, -1)).toFixed(2) + 'B';
    }
  }

  function getStockBySymbol(stocks, symbol) {
    return stocks.find((stock) => stock.Symbol === symbol);
  }

  function swapLocationOfStocksDown(symbol, direction) {
    const stockMarketData = Model.getState().stocks;
    const nextStockLocation = direction === 'up' ? -1 : 1;
    // console.info(symbol, direction);
    const temp = getStockBySymbol(stockMarketData, symbol);
    const symbolLocation = stockMarketData.indexOf(temp);
    const nextStock = stockMarketData[stockMarketData.indexOf(temp) + nextStockLocation];
    stockMarketData[symbolLocation] = nextStock;
    stockMarketData[symbolLocation + nextStockLocation] = temp;
    View.render(states)
  }

  function handleClickOnApplyFilter(filterAttributes) {
    // console.info('ctrlEventListenetAplly',filterAttributes);
    updateFilteredStocks(filterAttributes);
  }

  function updateFilteredStocks(filterAttributes) {
    states.ui.isFilteredShown = true;
    states.filtered = states.stocks.filter(stock => {
      return filterByName(stock, filterAttributes.name.toLocaleLowerCase()) && filterByGain(stock, filterAttributes.gain) && filterByRangeFrom(stock, filterAttributes.rangeFrom) && filterByRangeTo(stock, filterAttributes.rangeTo)
    });
    console.info('states after change', states);
    View.render(states);
  }

  function filterByRangeFrom(stock, from) {
    if (from) {
      return (parseFloat(stock.PercentChange) >= parseFloat(from));
    } else {
      return true;
    }
  }

  function filterByRangeTo(stock, to) {
    if (to) {
      return (parseFloat(stock.PercentChange) <= parseFloat(to));
    } else {
      return true;
    }
  }

  function filterByName(stock, name) {
    return (stock.Name.toLocaleLowerCase().includes(name));
  }

  function filterByGain(stock, gain) {
    // console.info('filterbygain',gain);
    switch (gain) {
      case 'gain':
        return (stock.Change > 0);
      case 'lose':
        return (stock.Change <= 0);
      case 'all':
        return true;
    }
  }

  function fetchSearch(query) {
    const temp = 'http://localhost:7000/search?q=' + `${query}`;
    fetch('http://localhost:7000/search?q=' + `${query}`)
      .then(response => {
        return response.json();
      })
      .then(res => {
        states = Model.getState();
        states.searchStocks = res.ResultSet.Result;
        console.log(states.searchStocks);
        View.renderSearchResult(states);
      });
  };

  function addStocksToUserStocks(stockSymbol){
    Model.getState().userStocks.push(stockSymbol);
    saveUIStateToLocalStorage();
    console.info('Model.getState().userStocks',Model.getState().userStocks);
  }

  function fetchStocks() {
    const query = (Model.getState().userStocks).toString();
    // console.info('query', query);
    // fetch('assets/mocks/stocks.json')
    fetch('http://localhost:7000/quotes?q=' + `${query}`)
      .then(response => {
        return response.json();
      })
      .then(res => {
        states = Model.getState();
        // console.info('res.query.results.quote;', res.query.results.quote);
        states.stocks = res.query.results.quote;
        states.filtered = res.query.results.quote;

        // View.render(states);
      });
  };

  function hashchangeHandler(e) {
    View.render(states);
  }

  function saveUIStateToLocalStorage() {
    localStorage.setItem('stokr-state', JSON.stringify(states));
  }

  function getUIStateToLocalStorage() {
    const temp = localStorage.getItem('stokr-state');
    if (temp !== null) {
      states = JSON.parse(temp);
    }
  }

//-------------------------------------------
  function init() {
    fetchStocks();
    getUIStateToLocalStorage();
    View.renderFilter(states);
    View.render(states);
  };

  init()

});

window.Stokr.Ctrl();
// Ctrl.saveUIStateToLocalStorage();
