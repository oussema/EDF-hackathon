const Web3= require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');


const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastTs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"letFinanceIt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"letProduct","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"oracle","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"a","type":"address"}],"name":"read","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"a","type":"address"},{"internalType":"uint256","name":"x","type":"uint256"}],"name":"registerDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"prod","type":"uint256"},{"internalType":"uint256","name":"ts","type":"uint256"}],"name":"registerProd","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reinit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOracle","type":"address"}],"name":"setOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"state","outputs":[{"internalType":"enum Defi.State","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

const provider = new HDWalletProvider(
    'c6e5d1482db4036006cfc454f380dc2245e45d675e212a2828d0791599194ccf',   // oracle private key 
    'https://volta-rpc.energyweb.org'       // volta api
  );
  const web3 = new Web3(provider);

  
  
  const defi = new web3.eth.Contract(abi,'0x72eb9f4C517378a3dCF5a8507d2694e074e0170E');
  
  const sendMessage = async (message,ts) => {
          const accounts= await web3.eth.getAccounts();
          const SM= await defi.methods.registerProd(message, ts).send({
              from: accounts[0]
          });
          console.log(SM)
      
  }
  let current_prod= parseInt(Math.max(Math.cos(2 * Math.PI * ( (new Date().getHours()) - 12)/ 24),0)*Math.random()*20);
  let i=0;
  let count = 0;
 while(i<30000){
  setTimeout(()=>sendMessage(current_prod,count++),i+=1000);
 }
  

provider.engine.stop();
