/**
 * Created by omrigo on 23/07/2017.
 */
(function() {
  'use strict';

  window.Stokr = window.Stokr || {};

  window.Stokr.Model = {
    getStocks,
    getStockBySymbol,
    getStockButtonEnums,
    getStockButtonDefaultLocation,
    getEnum,
    swapLocationOfStocksDown
  }

  function getStocks(){
    return stockMarketData;
  }

  function getStockBySymbol(symbol){
    return getStocks().find((stock) => stock.Symbol === symbol);
  }

  function getStockButtonEnums(){
    return stockButtonEnums;
  }

  function getStockButtonDefaultLocation(){
    return stockButtonDefaultLocation;
  }

  function swapLocationOfStocksDown(symbol,direction){
    const nextStockLocation = direction === 'up'? -1:1;
    console.info(symbol,direction);
    const temp =  getStockBySymbol(symbol);
    const symbolLocation = stockMarketData.indexOf(temp)
    const nextStock = stockMarketData[stockMarketData.indexOf(temp) + nextStockLocation];
    stockMarketData[symbolLocation] = nextStock;
    stockMarketData[symbolLocation + nextStockLocation] = temp;
    console.info('temp',temp);
    console.log(stockMarketData.indexOf(temp));
  }

  function getEnum(stock, enumLocation) {
    switch (enumLocation) {
      case 0:
        return stock.PercentChange;
      case 1:
        return stock.Change;
      case 2:
        return stock.Temp + 'B';
    }
  }

  const stockMarketData =
    [
      {
        "Symbol": "WIX",
        "Name": "Wix.com Ltd.",
        "Change": "0.750000",
        "PercentChange": "+1.51%",
        "LastTradePriceOnly": "76.099998",
        "Temp": "1.1"
      },
      {
        "Symbol": "MSFT",
        "Name": "Microsoft Corporation",
        "PercentChange": "-2.09%",
        "Change": "-0.850006",
        "LastTradePriceOnly": "69.620003",
        "Temp": "1.2"
      },
      {
        "Symbol": "YHOO",
        "Name": "Yahoo! Inc.",
        "Change": "0.279999",
        "PercentChange": "+1.11%",
        "LastTradePriceOnly": "50.599998",
        "Temp": "1.3"
      },
      {
        "Symbol": "ALEX",
        "Name": "Yahoo! Inc.",
        "Change": "-0.123",
        "PercentChange": "-1.123%",
        "LastTradePriceOnly": "50.599998",
        "Temp": "1.4"
      }
    ];

  let stockButtonEnums = ['PercentChange', 'Change', 'Temp'];
  let stockButtonDefaultLocation = 0;


}());
