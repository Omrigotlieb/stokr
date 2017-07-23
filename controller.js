/**
 * Created by omrigo on 18/07/2017.
 */
(function () {
  'use strict';
  window.Stokr = window.Stokr || {};
  const Model = window.Stokr.Model;
  const View = window.Stokr.View;

  const stockMarketData = Model.getStocks();
  const stockButtonEnums = Model.getStockButtonEnums();
  let stockButtonDefaultLocation = Model.getStockButtonDefaultLocation();


  window.Stokr.Ctrl = {
    ctrlAddEventListenerForStockChangesButtons,
    addEventListenerForArrowButtons
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


  function ctrlAddEventListenerForStockChangesButtons(stockChangeButtons) {
    stockChangeButtons.forEach(function (item) {
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('stock-daily-change-button')) {
          stockButtonDefaultLocation = (++stockButtonDefaultLocation) % stockButtonEnums.length;
          Array.from(stockMarketData).forEach(item => {
            document.querySelector('#' + `${item.Symbol}` + ' .stock-daily-change-button').innerHTML = Model.getEnum(item, stockButtonDefaultLocation);
          });
        }
      })
    })
  }


  function addEventListenerForArrowButtons(arrowButtons) {
    arrowButtons.forEach(function (item) {
      item.addEventListener('click', (e) => {
        const arrowId = e.target.closest('ul').id;
        if (e.target.classList.contains('arrow-down')) {
          Model.swapLocationOfStocksDown(arrowId, 'down');
        }
        if (e.target.classList.contains('arrow-up')) {
          Model.swapLocationOfStocksDown(arrowId, 'up');
        }
        console.info('sticks', Model.getStocks());
        View.render(Model.getStocks());
      })
    })

  }


//-------------------------------------------


  // View.renderHeader();
  View.render(stockMarketData);
  // addEventListeners();


}());
