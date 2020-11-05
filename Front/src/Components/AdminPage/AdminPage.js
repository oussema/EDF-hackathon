import React, {useState} from 'react' ;
import './AdminPage.css';
import {abi} from '../ABI/ABI';
import ListPayment from './ListPayment/ListPayment';
import Web3 from 'web3';
const AdminPage = ()=> {
    const [address,setAddress]=useState(null);
    const initiateSmartContract =async()=>{
        await window.ethereum.enable();
        const web3=new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to send from account', accounts[0]);
        const defi = new web3.eth.Contract(abi,'0x72eb9f4C517378a3dCF5a8507d2694e074e0170E');
        const initSC= await defi.methods.reinit().send({from : accounts[0]});
        console.log(initSC);
    }
    const initiateFunding = async()=>{
            await window.ethereum.enable();
            const web3=new Web3(window.web3.currentProvider);
            const accounts = await web3.eth.getAccounts();
            console.log('Attempting to send from account', accounts[0]);
            const defi = new web3.eth.Contract(abi,'0x72eb9f4C517378a3dCF5a8507d2694e074e0170E');
            const initFund= await defi.methods.letFinanceIt().send({from : accounts[0]});
            console.log(initFund);
    }
    const initiateProduction = async()=>{
        await window.ethereum.enable();
        const web3=new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to send from account', accounts[0]);
        const defi = new web3.eth.Contract(abi,'0x72eb9f4C517378a3dCF5a8507d2694e074e0170E');
        const initProd= await defi.methods.letProduct().send({from : accounts[0]});
        console.log(initProd);
    }
    const setOracleAddress= async(address)=>{
        await window.ethereum.enable();
        const web3=new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to send from account', accounts[0]);
        const defi = new web3.eth.Contract(abi,'0x72eb9f4C517378a3dCF5a8507d2694e074e0170E');
        const initProd= await defi.methods.setOracle(address).send({from : accounts[0]});
        console.log(initProd);
    }
    return (
    <div className="outAdmin">
        <div style={{marginLeft:"30%",fontSize:"50px"}}> welcome admin</div>
        <div style={{display:"flex",justifyContent:"left"}}>
            <ListPayment></ListPayment>
            <div style={{marginLeft: "300px", marginTop: "50px"}}>
            <button  style={{marginBottom:'30px'}} className="btn btn-info btn-block" onClick={()=>initiateSmartContract()}>Initiate Smart Contract</button>
                <button  style={{marginBottom:'30px'}} className="btn btn-info btn-block" onClick={()=>initiateFunding()}>Initiate Funding</button>
                <button  style={{marginBottom:'30px'}} className="btn btn-info btn-block" onClick={()=>initiateProduction()}>Initiate Production</button>
                
                <div>
                    <button  className="btn btn-info btn-block" onClick={()=>setOracleAddress(address)}>Set Oracle</button>
                    <input name="oracleAddress" onChange={(e)=>setAddress(e.target.value)}/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AdminPage;