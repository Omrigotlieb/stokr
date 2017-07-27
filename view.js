/**
 * Created by omrigo on 23/07/2017.
 */
(function () {
  'use strict';

  window.Stokr = window.Stokr || {};
  let Ctrl = {};

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

  function renderHeader() {
    const header = document.querySelector('#header');
    header.innerHTML = `
        <div class="stock-tiker">
          <a href="" id="header-link"><h1 class="stokr">STOKR</h1></a>
          </div>
         <div class="navigation-div">
         <ul class="navigation-list">
         <li>
          <a href="#search">
          <button>
            <img src="assets/svg/search.svg"
		          class="search-icon">
		      </button>
		      </a>
		     </li>
		     <li>
          <button id="refresh">
            <img src="assets/svg/refresh.svg"
		          class="refresh-icon">
		      </button>
		     </li>
		     <li>
          <button id="filter">
            <img src="assets/svg/filter.svg"
		          class="filter-icon">
		      </button>
		     </li>
		     <li>
          <button id="setting">
            <img src="assets/svg/settings.svg"
		          class="setting-icon">
		      </button>
		     </li>
        </ul>
     </div>`;
  }

  function renderSearch() {
    Ctrl = window.Stokr.Ctrl;
    console.info('Ctrl.getState() - 1',Ctrl.getState());
    const header = document.querySelector('#header');
    const root = document.querySelector('#root');
    const filter = document.querySelector('div.filter-section');
    header.innerHTML = `
         <div class="search">
          <input id="search-bar" type="text">
          <div id="cancel"><a href="#">Cancel</a></div>
     </div>`;
    root.innerHTML = `<div id="searchSectionImage"><img src="assets/svg/search-place-holder.svg"
  class="search-icon"></div>`;
    filter.style.display = 'none';
  }

  function searchBarEventHandler(e) {
    const Ctrl = window.Stokr.Ctrl;
    const search = document.querySelector('#search-bar');
    console.info('event', e);
    console.info('Ctrl.getState() - 2',Ctrl.getState());
    if (e.keyCode === 13) {
      console.log('Enter!!!');
      console.log(search.value);
      Ctrl.fetchSearch(search.value);
    }
  }

  function renderSearchResult(states) {
    const root = document.querySelector('#root');
    const searchList = getSearchItems(states);
    root.innerHTML = searchList;
    addPlusButtonListener();
  }

  function getSearchItems(states) {
    console.info('states.searchStock', states.searchStocks);
    const searchStocks = states.searchStocks;
    console.info('searchStocks', searchStocks);
    return `<ul class="stock-list">
            ${searchStocks.map((stock, index, stocks) => {
      return createSearchItem(stock, index, stocks, states)
    }).join('')}
          </ul>`;
  }

  function createSearchItem(stock, index, stocks, states) {
    console.info('createSearchItem - stock',stock);
    return `<li class="stock-list-font">
            <ul id="${stock.symbol}" class="search-data">
           
              <li>${stock.symbol}</li>
                <li class="addStock" >
                <button class="addShape">
                  <div class="oval-line-vertical"></div>
                  <div class="oval-line-horizontal"></div>
                  </button>
              </li>
            </ul>
          </li>
          <div class="line"></div>`;
  }

  function addSearchListener() {
    const search = document.querySelector('#search-bar');
    search.addEventListener('keydown', searchBarEventHandler);
  }

  function addPlusButtonListener() {
    const plusButtonArray = document.querySelectorAll('button.addShape');
    // plusButton.addEventListener('click', addButtonEventHandler);
    addButtonArrayEventHandler(plusButtonArray);
  }

  function addButtonArrayEventHandler(plusButtonArray){
    plusButtonArray.forEach(item => {
      item.addEventListener('click', addButtonEventHandler);
    })
  }

  function addButtonEventHandler(plusButton){
    Ctrl = window.Stokr.Ctrl;
    console.info('Ctrl.getState() - 3',Ctrl.getState());
    let symbolOfButton = plusButton.path[2].id === ''? plusButton.path[3].id: plusButton.path[2].id;

    const states = Ctrl.getState();
      const searchArray = states.searchStocks.filter((item) => {
        return item.symbol.toLocaleLowerCase() === symbolOfButton.toLocaleLowerCase();
      });
    console.info('Ctrl.getState() - 4',Ctrl.getState());
    states.stocks = states.stocks.concat(searchArray);
    states.userStocks = states.userStocks.concat(searchArray[0].symbol.toUpperCase());

    console.info('Ctrl.getState() - 5',Ctrl.getState());
    // Ctrl.addStocksToUserStocks(searchArray[0].symbol.toUpperCase());
    console.info('Ctrl.getState() - 6',Ctrl.getState());
    Ctrl.saveUIStateToLocalStorage();
  }

  function renderFilter(states) {
    const filterSection = document.querySelector('div.filter-section');
    filterSection.style.display = states.ui.isFilteredShown ? 'flex' : 'none';

    const filter = document.querySelector('div.filter');

    filter.innerHTML = '<div  class="by-name">By Name<input id="name" type="text" value=""></div>' +
      '<div class="by-gain">By Gain' +
      '<select id="gain">' +
      '<option value="all">All</option>' +
      '<option value="gain">Gain</option>' +
      '<option value="lose">Lose</option>' +
      '</select>' +
      '</div>' +
      '<div class="by-range-from">By Range: From<input id="range-from" type="number"></div>' +
      '<div class="by-range-to">By Range: to<input id="range-to" type="number"></div>';
  }

  function renderStocks(states) {
    Ctrl = window.Stokr.Ctrl;
    Ctrl.fetchStocks();
    Ctrl.saveUIStateToLocalStorage();
    const root = document.querySelector('#root');
    let stockList = [];
    if (!states.ui.isFilteredShown) {
      stockList = getStockItems(states);
    } else {
      stockList = getStockItems(states);
    }
    root.innerHTML = stockList;
  }

  function getStockItems(states) {
    // debugger;
    const filteredStocks = states.ui.isFilteredShown ? states.filtered : states.stocks;
    console.info('filteredStocks', filteredStocks);
    // alert("caller is " + getStockItems.caller.toString());
    return `<ul class="stock-list">
         ${filteredStocks.map((stock, index, stocks) => {
      return createStockItem(stock, index, stocks, states)
    }).join('')}
          </ul>`;
  }

  function createStockItem(stock, index, stocks, states) {
    const stockIncrease = `${stock.Change}` >= 0 ? 'increase' : 'decrease';
    const upDisabled = index === 0 ? 'disabled' : '';
    // console.info('stocks', states);
    const displayArrow = states.ui.isFilteredShown ? 'style= display:none' : 'style= display : flex';
    const displayDelete = states.ui.isSettingShown ? 'style= display:flex' : 'style= display:none';

    const downDisabled = index === stocks.length - 1 ? 'disabled' : '';
    const LastTradePriceFixed = parseFloat(stock.LastTradePriceOnly).toFixed(2);
    const defaultViewPercentChangeFixed = parseFloat(stock.realtime_chg_percent).toFixed(2) + '%';
    return `<li class="stock-list-font">
            <ul id="${stock.Symbol}" class="stock-data">
              <li class="deleteStock" ${displayDelete}>
                <div class="oval" >
                  <div class="oval-line">
                  </div>
                 </div>
              </li>
              <li>${stock.Symbol}</li>
              <li>${LastTradePriceFixed}</li>
              <li>
                <button class="stock-daily-change-button ${stockIncrease}">
${defaultViewPercentChangeFixed}</button>
              </li>
              <li class="arrows">
                <button class="arrow arrow-up icon-arrow" ${upDisabled} ${displayArrow}></button>
                <button class="arrow arrow-down icon-arrow" ${downDisabled} ${displayArrow}></button>
              </li>
            </ul>
          </li>
          <div class="line"></div>`;
  }

  function viewAddEventListenerForStockChangesButtons() {
    Ctrl = window.Stokr.Ctrl;
    const stockChangeButtons = document.querySelectorAll('#root button.stock-daily-change-button');
    ctrlAddEventListenerForStockChangesButtons(stockChangeButtons);
  }

  function addEventListenerForHashChange() {
    window.addEventListener('hashchange', Ctrl.hashchangeHandler);
  }

  function addEventListenerForApplyButton() {
    const Ctrl = window.Stokr.Ctrl;
    const applyButton = document.querySelector('button#apply');

    const filterName = document.querySelector('input#name');
    const filterGain = document.querySelector('select#gain');
    const filterRangeFrom = document.querySelector('input#range-from');
    const filterRangeTo = document.querySelector('input#range-to');
    applyButton.addEventListener('click', (e) => {

      const filterAttributes = {
        'name': `${filterName.value}`,
        'gain': `${filterGain.value}`,
        'rangeFrom': `${filterRangeFrom.value}`,
        'rangeTo': `${filterRangeTo.value}`
      };
      Ctrl.handleClickOnApplyFilter(filterAttributes);
    });
  }

  function viewAddEventListenerForUpArrowButtons() {
    const arrowButtons = document.querySelectorAll('#root button.arrow');
    addEventListenerForArrowButtons(arrowButtons);
  }

  function filterButtonClickEventListener() {
    const filterButton = document.querySelectorAll('button#filter');
    // addEventListenerForFilterButton(filterButton);
    filterButton[0].addEventListener('click', filterButtonEventHandler);
  }

  function filterButtonEventHandler() {
    const Ctrl = window.Stokr.Ctrl;
    const states = Ctrl.getState();
    const filterDiv = document.querySelector('div.filter-section');
    // const arrowButtons = document.querySelectorAll('#root button.arrow');
    const filterLine = document.querySelector('#filter-line');
    if (states.ui.isFilteredShown) {
      states.ui.isFilteredShown = false;
      filterDiv.style.display = 'none';
      filterLine.style.display = 'block';
    } else {
      states.ui.isFilteredShown = true;
      filterDiv.style.display = 'flex';
      filterLine.style.display = 'block';
    }
    Ctrl.saveUIStateToLocalStorage();
    render(Ctrl.getState());
  }

  function refreshEventHandler() {
    console.info('Refreshed page');
    Ctrl = window.Stokr.Ctrl;
    Ctrl.init();
  }

  function refreshClickEventListener() {
    const refreshButton = document.querySelector('button#refresh');
    refreshButton.addEventListener('click', refreshEventHandler);
  }

  function settingEventHandler() {
    console.info('Setting pressed');
    const settingLi = document.querySelectorAll('ul li.deleteStock');
    console.info('settingLi', settingLi);
    const Ctrl = window.Stokr.Ctrl;
    if (Ctrl.getState().ui.isSettingShown) {
      Ctrl.getState().ui.isSettingShown = false;
      settingLi.forEach(item => {
        item.style.display = 'none';
      });
    } else {
      Ctrl.getState().ui.isSettingShown = true;
      settingLi.forEach(item => {
        item.style.display = 'block';
      });
    }
    Ctrl.saveUIStateToLocalStorage();
  }

  function settingClickEventListener() {
    const settingButton = document.querySelector('button#setting');
    settingButton.addEventListener('click', settingEventHandler);
  }

  function render(states) {
    // console.info('window.location.hash', window.location.hash);
    if (window.location.hash === '#search') {
      renderSearch();
    } else {
      renderHeader();
      renderStocks(states);
      // addEventListeners();
    }
    addEventListeners();
  }

  function addEventListeners() {
    addEventListenerForHashChange();

    if (window.location.hash !== '#search') {
      refreshClickEventListener();
      viewAddEventListenerForStockChangesButtons();
      viewAddEventListenerForUpArrowButtons();
      filterButtonClickEventListener();
      settingClickEventListener();
      // settingButtonClickEventListener();
      addEventListenerForApplyButton();
    } else {
      addSearchListener();
    }


    // addEventListenerForArrowButtons();
  }

  function addEventListenerForArrowButtons(arrowButtons) {
    Ctrl = window.Stokr.Ctrl;
    arrowButtons.forEach(function (item) {
      item.addEventListener('click', (e) => {
        const arrowId = e.target.closest('ul').id;
        if (e.target.classList.contains('arrow-down')) {
          Ctrl.swapLocationOfStocksDown(arrowId, 'down');
        }
        if (e.target.classList.contains('arrow-up')) {
          Ctrl.swapLocationOfStocksDown(arrowId, 'up');
        }
      })
    })
  }

  function ctrlAddEventListenerForStockChangesButtons(stockChangeButtons) {
    Ctrl = window.Stokr.Ctrl;
    let stockButtonDefaultLocation = Ctrl.getStockButtonDefaultLocation();
    const stockButtonEnums = Ctrl.getStockEnums();
    const states = Ctrl.getState();
    const stockMarketData = states.ui.isFilteredShown ? states.filtered : states.stocks;
    stockChangeButtons.forEach(function (item) {
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('stock-daily-change-button')) {
          stockButtonDefaultLocation = (++stockButtonDefaultLocation) % stockButtonEnums.length;
          Ctrl.setStockButtonDefaultLocation(stockButtonDefaultLocation);
          Ctrl.saveUIStateToLocalStorage();
          Array.from(stockMarketData).forEach(item => {
            document.querySelector('#' + `${item.Symbol}` + ' .stock-daily-change-button').innerHTML = Ctrl.getEnum(item, stockButtonDefaultLocation);
          });
        }
      })
    })
  }

  window.Stokr.View = {
    render,
    renderFilter,
    renderSearchResult
  }
}());

