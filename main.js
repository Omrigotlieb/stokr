/**
 * Created by omrigo on 18/07/2017.
 */

const stockMarketData =
  [
    {
      "Symbol": "WIX",
      "Name": "Wix.com Ltd.",
      "Change": "0.750000",
      "PercentChange": "+1.51%",
      "LastTradePriceOnly": "76.099998",
      "Temp": "1111"
    },
    {
      "Symbol": "MSFT",
      "Name": "Microsoft Corporation",
      "PercentChange": "-2.09%",
      "Change": "-0.850006",
      "LastTradePriceOnly": "69.620003",
      "Temp": "22222"
    },
    {
      "Symbol": "YHOO",
      "Name": "Yahoo! Inc.",
      "Change": "0.279999",
      "PercentChange": "+1.11%",
      "LastTradePriceOnly": "50.599998",
      "Temp": "33333"
    },
    {
      "Symbol": "s",
      "Name": "Yahoo! Inc.",
      "Change": "0.123",
      "PercentChange": "+1.123%",
      "LastTradePriceOnly": "50.599998",
      "Temp": "4444"
    }
  ];

let stockButtonEnums = ['PercentChange','Change','Temp'];
let stockButtonDefaultLocation = 0;

//------------------ header section --------------->

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


//------------------ stock section ---------------
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
  let stockIncrease =  `${stock.Change}` >= 0? 'increase': 'decrease';
  // let changeEnums =  getEnum(stock,stockButtonDefaultLocation);
  // console.info('changeEnums',changeEnums);
  // console.info('result',result);
  // console.info('changeEnums',`${result}`);
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

function getEnum(stock,enumLocation) {

  switch (enumLocation) {
    case 0: return stock.PercentChange;
    case 1: return stock.Change;
    case 2: return stock.Temp;
  }
}
//-------------------------------------------

function addEventListeners(){
  let stockChangeButtons = document.querySelectorAll('#root button.stock-daily-change-button');
  stockChangeButtons.forEach(function (item) {
    addEventListener('click', (e) => {
      console.info('event',e);
      console.info('stockButtonDefaultLocation before',stockButtonDefaultLocation);
      stockButtonDefaultLocation = (++stockButtonDefaultLocation) % stockButtonEnums.length;
      console.info('stockButtonDefaultLocation after',stockButtonDefaultLocation);
      Array.from(stockMarketData).forEach(item => {
        document.querySelector('#' + `${item.Symbol}`).innerHTML = getEnum(item,stockButtonDefaultLocation);

      });

    })
  })
}


//-------------------------------------------



renderHeader();
renderStocks(stockMarketData);
addEventListeners();
