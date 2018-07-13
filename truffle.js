var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic = 'YOUR_ACCOUNT_SEED_WORDS';
var infuraKey = 'YOUR_INFURA_KET';

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/' + infuraKey);
      },
      gas: 1000000,
      network_id: 4
    }
  }
};
