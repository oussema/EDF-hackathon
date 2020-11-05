const path=require('path');
const fs= require('fs');
const solc=require('solc');

const contractPath= path.resolve(__dirname,'Contracts','defi.sol');

const source =fs.readFileSync(contractPath,'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'defi.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

// to compile smart contract:
const result= JSON.parse(solc.compile(JSON.stringify(input)));


//showing the ABI in the console : 
console.log(JSON.stringify(result.contracts['defi.sol'].Defi.abi));
