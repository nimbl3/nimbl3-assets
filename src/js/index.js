var App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    console.log('init web3');
     // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // If no injected web3 instance is detected, fallback to Ganache CLI.
      App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('AssetManager.json', function(data) {
      const truffleContract = require('truffle-contract')
      App.contracts.AssetManager = truffleContract(data);
      App.contracts.AssetManager.setProvider(App.web3Provider);
      return App.bindEvents();
    });
  },

  bindEvents: function() {
    console.log('bindevents');
    $('#newAssetForm').on('submit', (e) => {
      e.preventDefault();
      console.log('submit');
    });
  },

  addNewAsset: function(e) {
    e.preventDefault();

    console.log('submit');
  }
};

$(function() {
  $(window).on('load', function() {
    console.log('load');
    App.init();
  });
});
