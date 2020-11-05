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

// pour compiler notre smart contract:
const result= JSON.parse(solc.compile(JSON.stringify(input)));

//pour afficher les erreurs de compilation  :
console.log(result);



module.exports = {
    abi:result.contracts['defi.sol'].Defi.abi,
    bytecode: result.contracts['defi.sol'].Defi.evm.bytecode.object
}

