/**
 * Created by omrigo on 23/07/2017.
 */
(function () {
  'use strict';

  window.Stokr = window.Stokr || {};

  window.Stokr.Model = {
    getState
  }


  function getState() {
    return states;
  }

  const states = {
    ui: {
      isFilteredShown: false,
      isSettingShown: false,
      stockButtonDefaultLocation: 0,
      stockButtonEnums: ['realtime_chg_percent', 'Change', 'MarketCapitalization']
    },
    userStocks: [
      "WIX",
      "MSFT",
      "EBS",
      "PNK"
    ],
    stocks: [],
    searchStocks: [],
    filtered: []
  }




}());
