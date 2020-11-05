import React, { useState } from 'react' ;
import {abi} from '../../ABI/ABI';
import Web3 from 'web3';
import './PaymentItem.css';
const PaymentItem = ({id,address,amount,projectNumber})=> {
    const [walletAddress,setWA]= useState(null);
    const fetchClientAddress =async()=>{
        const data = {
            id: id,
            email : address,
            amount: amount,
            projectNumber: projectNumber,
            isHandled: 'true' 
        }


        let d = JSON.stringify(data);
        const response1 = await fetch("http://127.0.0.1:1234/payments/update", {
                method:"POST",
                headers: { 'Content-Type': 'application/json' },
                body: d
            });
        console.log(response1);
        const response2 = await fetch("http://127.0.0.1:1234/users/userWallet", {
                method:"POST",
                headers: { 'Content-Type': 'application/json' },
                body: d
            }).then((res)=>res.json());
        console.log(response2.walletAddress);
        return response2.walletAddress;
        
    }
    const registerDeposit =async(address)=>{
            await window.ethereum.enable();
            const web3=new Web3(window.web3.currentProvider);
            const accounts = await web3.eth.getAccounts();
            console.log('Attempting to send from account', accounts[0]);
            const defi = new web3.eth.Contract(abi,'0x72eb9f4C517378a3dCF5a8507d2694e074e0170E');
            const regDep= await defi.methods.registerDeposit(address, amount ).send({from : accounts[0]});
            console.log(regDep);
    }
    const handleAccept =  async()=>{
        let address= await fetchClientAddress();
        registerDeposit(address);
    }
    return (
    <div className="outPaymentItem">
        <div style={{marginLeft:'10px', width:"200px", height:"50px"}}>{address}</div>
        <div style={{marginLeft:'10px', width:"100px", height:"50px"}}>{projectNumber}</div>
        <div style={{marginLeft:'10px' ,width:"100px", height:"50px"}}>{amount} € </div>
        <div style={{width:"100px"}}>
            <button  className="btn btn-danger btn-block" onClick={()=>{handleAccept()}}>Accept</button>
        </div>
    </div>

    )
}

export default PaymentItem;