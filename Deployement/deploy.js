const Web3= require('web3');
const {abi,bytecode}=require('./compile');
const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
    '9bc4b6fd0c92a3d63c24c6866ad3c4f07ee656c9410249ec7bb307f4943cf405',   // Admin private key 
    'https://volta-rpc.energyweb.org'       // volta api
  );
  const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
  
    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(abi)
      .deploy({ data: '0x'+bytecode}) 
      .send({  from: accounts[0] });
    
    console.log('Contract deployed to', result.options.address);
  };
deploy();

provider.engine.stop();