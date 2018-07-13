var App = {
  web3Provider: null,
  contracts: {},

  init: () => {
    return App.initWeb3();
  },

  initWeb3: () => {
     // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // If no injected web3 instance is detected, fallback to Ganache CLI.
      App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }

    App.account = web3.eth.defaultAccount = web3.eth.accounts[0];

    return App.initContract();
  },

  initContract: () => {
    $.getJSON('AssetManager.json', function(data) {
      const truffleContract = require('truffle-contract')
      App.contracts.AssetManager = truffleContract(data);
      App.contracts.AssetManager.setProvider(App.web3Provider);

      App.contracts.AssetManager.deployed()
      .then((instance) => {
        App.AssetManager = instance;

        App.getAllAssets();
        App.bindEvents();
      });
    });
  },

  bindEvents: () => {
    $('#newAssetForm').on('submit', App.addNewAsset);

    let event = App.AssetManager.AssetAdded(function(error, result) {
      if (!error) {
        App.renderAssetRow(result.args.name, result.args.from);
      } else {
        alert('error');
      }
    });
  },

  addNewAsset: (e) => {
    e.preventDefault();

    const slug = $("input[name=slug]").val();
    const name = $("input[name=name]").val();
    
    App.AssetManager.addAsset(slug, name, { from: App.account })
    .then((result) => {
      $(e.currentTarget)[0].reset();
      // location.reload();
    })
    .catch((e) => {
      console.error(e);
    });
  },

  getAllAssets: () => {
    App.AssetManager.assetCount()
    .then((assetCount) => {
      App.getAssetDetails(assetCount);
    });
  },

  getAssetDetails: (assetCount) => {
    let assetPromises = [];
    for (var i = 0; i < assetCount; i++) {
      assetPromises.push(App.AssetManager.getAsset(i));
     }

    Promise.all(assetPromises).then((assets) => {
      App.renderAssets(assets);
    });
  },

  renderAssets: (assets) => {
    assets.forEach((asset) => {
      App.renderAssetRow(asset[0], asset[1]);
    });
  },

  renderAssetRow: (name, owner) => {
    $('.list-asset').append(`<li><div><b>${name}</b></div><div>Owner: ${owner}</div></li>`);
  }
};

$(() => {
  $(window).on('load', () => {
    App.init();
  });
});
