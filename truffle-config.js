
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    }
  },

  compilers: {
    solc: {
      version: "0.8.0", 
    }
  },

  db: {
    enabled: false,
  }
};



















// require('dotenv').config(); 
// const HDWalletProvider = require('@truffle/hdwallet-provider');

// const INFURA_KEY = process.env.INFURA_KEY;
// const MNEMONIC = process.env.MNEMONIC;

// module.exports = {
//   networks: {
//     development: {
//       host: "127.0.0.1",
//       port: 7545,
//       network_id: "*",
//     },
//     sepolia: {
//       provider: () => new HDWalletProvider(MNEMONIC, `https://sepolia.infura.io/v3/${INFURA_KEY}`),
//       network_id: 11155111, 
//       gas: 5500000,        
//       confirmations: 2,    
//       timeoutBlocks: 200,  
//       skipDryRun: true     
//     }
//   },

//   compilers: {
//     solc: {
//       version: "0.8.0",  
//     }
//   },

//   db: {
//     enabled: false, 
//   }
// };
