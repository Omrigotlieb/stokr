/**
 * Created by omrigo on 23/07/2017.
 */

(function() {
  'use strict';

  window.Stokr = window.Stokr || {};
  const Model = window.Stokr.Model;

  let Ctrl = {};




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
         ${stocks.map(createStockItem).join('')}
          </ul>`;
  }

  function createStockItem(stock, index, stocks) {
    const stockIncrease = `${stock.Change}` >= 0 ? 'increase' : 'decrease';
    const upDisabled = index === 0? 'disabled':'';
    const downDisabled = index === stocks.length-1? 'disabled':'';

    return `<li class="stock-list-font">
            <ul id="${stock.Symbol}" class="stock-data">
              <li>${stock.Symbol}</li>
              <li>${stock.LastTradePriceOnly}</li>
              <li>
                <button  class="stock-daily-change-button ${stockIncrease}">
${stock.PercentChange}</button>
              </li>
              <li class="arrows">
                <button class="arrow arrow-up icon-arrow" ${upDisabled}></button>
                <button class="arrow arrow-down icon-arrow" ${downDisabled}></button>
              </li>
            </ul>
          </li>
          <div class="line"></div>`;
  }


  function viewAddEventListenerForStockChangesButtons(){
    Ctrl = window.Stokr.Ctrl;
    let stockChangeButtons = document.querySelectorAll('#root button.stock-daily-change-button');
    Ctrl.ctrlAddEventListenerForStockChangesButtons(stockChangeButtons);
  }


  function viewAddEventListenerForUpArrowButtons(){
    // const Ctrl = window.Stokr.Ctrl;
    const arrowButtons = document.querySelectorAll('#root button.arrow');
    // console.info("view.js arrowButtons",arrowButtons);
    Ctrl.addEventListenerForArrowButtons(arrowButtons);
  }


  function render(stockMarketData){
    renderHeader();
    renderStocks(stockMarketData);
    addEventListeners();
  }

  function addEventListeners() {
    viewAddEventListenerForStockChangesButtons();
    viewAddEventListenerForUpArrowButtons();
    // addEventListenerForArrowButtons();
  }

  window.Stokr.View = {
    render,
  }
}());

