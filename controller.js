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
    // renderHeader

  }
  // Moved to model.js
  // const stockMarketData =
  //   [
  //     {
  //       "Symbol": "WIX",
  //       "Name": "Wix.com Ltd.",
  //       "Change": "0.750000",
  //       "PercentChange": "+1.51%",
  //       "LastTradePriceOnly": "76.099998",
  //       "Temp": "1.1"
  //     },
  //     {
  //       "Symbol": "MSFT",
  //       "Name": "Microsoft Corporation",
  //       "PercentChange": "-2.09%",
  //       "Change": "-0.850006",
  //       "LastTradePriceOnly": "69.620003",
  //       "Temp": "1.2"
  //     },
  //     {
  //       "Symbol": "YHOO",
  //       "Name": "Yahoo! Inc.",
  //       "Change": "0.279999",
  //       "PercentChange": "+1.11%",
  //       "LastTradePriceOnly": "50.599998",
  //       "Temp": "1.3"
  //     },
  //     {
  //       "Symbol": "ALEX",
  //       "Name": "Yahoo! Inc.",
  //       "Change": "-0.123",
  //       "PercentChange": "-1.123%",
  //       "LastTradePriceOnly": "50.599998",
  //       "Temp": "1.4"
  //     }
  //   ];
  //
  //
  // let stockButtonEnums = ['PercentChange', 'Change', 'Temp'];
  // let stockButtonDefaultLocation = 0;

//------------------ header section --------------->
//
//   function renderHeader() {
//     const header = document.querySelector('#header');
//     header.innerHTML = `
//         <div class="stock-tiker">
//           <h1 class="stokr">STOKR</h1>
//           </div>
//          <div class="navigation-div">
//          <ul class="navigation-list">
//          <li>
//           <button>
//             <img src="assets/svg/search.svg"
// 		          class="search-icon">
// 		      </button>
// 		     </li>
// 		     <li>
//           <button>
//             <img src="assets/svg/refresh.svg"
// 		          class="refresh-icon">
// 		      </button>
// 		     </li>
// 		     <li>
//           <button>
//             <img src="assets/svg/filter.svg"
// 		          class="filter-icon">
// 		      </button>
// 		     </li>
// 		     <li>
//           <button>
//             <img src="assets/svg/settings.svg"
// 		          class="setting-icon">
// 		      </button>
// 		     </li>
//         </ul>
//      </div>`;
//   }


//------------------ stock section ---------------
//   function renderStocks(stockMarketData) {
//     const root = document.querySelector('#root');
//     let stockList = getStockItems(stockMarketData);
//     root.innerHTML = stockList;
//   }
//
//
//   function getStockItems(stocks) {
//     return `<ul class="stock-list">
//          ${stocks.map(item => createStockItem(item)).join('')}
//           </ul>`;
//   }
//
//   function createStockItem(stock) {
//     let stockIncrease = `${stock.Change}` >= 0 ? 'increase' : 'decrease';
//     return `<li class="stock-list-font">
//             <ul class="stock-data">
//               <li>${stock.Symbol}</li>
//               <li>${stock.LastTradePriceOnly}</li>
//               <li>
//                 <button datastate="0" id="${stock.Symbol}" class="stock-daily-change-button ${stockIncrease}">
// ${stock.PercentChange}</button>
//               </li>
//               <li class="arrows">
//               <button class="arrow arrow-up">
//                 <img src="assets/svg/arrow.svg">
// 		          </button>
//               <button class="arrow arrow-down">
//                 <img src="assets/svg/arrow.svg">
// 		          </button>
//               </li>
//             </ul>
//           </li>
//           <div class="line"></div>`;
//   }

  // function getEnum(stock, enumLocation) {
  //   switch (enumLocation) {
  //     case 0:
  //       return stock.PercentChange;
  //     case 1:
  //       return stock.Change;
  //     case 2:
  //       return stock.Temp + 'B';
  //   }
  // }

//-------------------------------------------

  function addEventListeners() {
    addEventListenerForStockChangesButtons();
    addEventListenerForArrowButtons();
  }


  function addEventListenerForStockChangesButtons() {
    let stockChangeButtons = document.querySelectorAll('#root button.stock-daily-change-button');
    stockChangeButtons.forEach(function (item) {
      addEventListener('click', (e) => {
        if (e.target.classList.contains('stock-daily-change-button')) {
          stockButtonDefaultLocation = (++stockButtonDefaultLocation) % stockButtonEnums.length;
          Array.from(stockMarketData).forEach(item => {
            document.querySelector('#' + `${item.Symbol}`).innerHTML = Model.getEnum(item, stockButtonDefaultLocation);
          });
        }
      })
    })
  }







  function addEventListenerForArrowButtons() {
    addEventListenerFordownArrowButtons();
    addEventListenerForupArrowButtons();
  }

  function addEventListenerFordownArrowButtons() {
  };


  function addEventListenerForupArrowButtons() {
    let upArrowButtons = document.querySelectorAll('#root li');
    upArrowButtons.forEach(function (item) {
      addEventListener('click', (e) => {
        console.info('event', e.target);
        if (e.target.nodeName === 'IMG') {
          console.log("up arrow was clicked");

        }
      })
    })
  }


//-------------------------------------------


  // View.renderHeader();
  View.render(stockMarketData);
  addEventListeners();


}());
