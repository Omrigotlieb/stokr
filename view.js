/**
 * Created by omrigo on 23/07/2017.
 */
/**
 * Created by omrigo on 23/07/2017.
 */
(function() {
  'use strict';

  window.Stokr = window.Stokr || {};
  const Model = window.Stokr.Model;
  const Ctrl = window.Stokr.Ctrl;


  window.Stokr.View = {
    render
  }


  function render(stockMarketData){
    renderHeader();
    renderStocks(stockMarketData);
  }
  function renderHeader() {
    const header = document.querySelector('#header');
    header.innerHTML = `
        <div class="stock-tiker">
          <h1 class="stokr">STOKR</h1>
          </div>
         <div class="navigation-div">
         <ul class="navigation-list">
         <li>
          <button>
            <img src="assets/svg/search.svg"
		          class="search-icon">
		      </button>
		     </li>
		     <li>
          <button>
            <img src="assets/svg/refresh.svg"
		          class="refresh-icon">
		      </button>
		     </li>
		     <li>
          <button>
            <img src="assets/svg/filter.svg"
		          class="filter-icon">
		      </button>
		     </li>
		     <li>
          <button>
            <img src="assets/svg/settings.svg"
		          class="setting-icon">
		      </button>
		     </li>
        </ul>
     </div>`;
  }

  function renderStocks(stockMarketData) {
    const root = document.querySelector('#root');
    let stockList = getStockItems(stockMarketData);
    root.innerHTML = stockList;
  }


  function getStockItems(stocks) {
    return `<ul class="stock-list">
         ${stocks.map(item => createStockItem(item)).join('')}
          </ul>`;
  }

  function createStockItem(stock) {
    let stockIncrease = `${stock.Change}` >= 0 ? 'increase' : 'decrease';
    return `<li class="stock-list-font">
            <ul class="stock-data">
              <li>${stock.Symbol}</li>
              <li>${stock.LastTradePriceOnly}</li>
              <li>
                <button datastate="0" id="${stock.Symbol}" class="stock-daily-change-button ${stockIncrease}">
${stock.PercentChange}</button>
              </li>
              <li class="arrows">
              <button class="arrow arrow-up">
                <img src="assets/svg/arrow.svg">
		          </button>
              <button class="arrow arrow-down">
                <img src="assets/svg/arrow.svg">
		          </button>
              </li>
            </ul>
          </li>
          <div class="line"></div>`;
  }

  // function addEventListenerForStockChangesButtons(){
  //   let stockChangeButtons = document.querySelectorAll('#root button.stock-daily-change-button');
  //   stockChangeButtons.forEach(function (item) {
  //     addEventListener('click', (e) => Ctrl.
  // }
  //
}());



// setup event listeners
// main and will call Ctrl for handle the events
