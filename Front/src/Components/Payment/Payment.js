import React, { useState } from 'react' ;
import './Payment.css';
import {abi} from '../ABI/ABI';
import Web3 from 'web3';
const Payment = ({location})=> {
    const [reward,setReward]=useState(0);
    const [amount,setAmount]=useState(0);
    const collectReward = async()=>{
        await window.ethereum.enable();
        const web3=new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to send from account', accounts[0]);
        const defi = new web3.eth.Contract(abi,'0x72eb9f4C517378a3dCF5a8507d2694e074e0170E');
        const colRew= await defi.methods.read(accounts[0]).call({from : accounts[0]});
        console.log(colRew[1]);
        setReward(colRew[1]);
}
    const sendPayment =async()=>{
        const data = {
            email : location.state.userEmail,
            amount: amount,
            projectNumber: location.state.projectNumber,
            isHandled: 'false'
        }

        let d = JSON.stringify(data);
        
        const response = await fetch("http://127.0.0.1:1234/payments/create", {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: d
        });
    }
    return (
    <div className="outAllPayment"> 
        <div className="outPayment">
        <div className="outAmount">
            <div style={{padding : '15px'}}>Amount :</div>
            <input className="inputStyle" onChange={(e)=>{setAmount(e.target.value)}}/>
            <div style={{padding : '15px'}}>€</div>
        </div>
        <div style={{marginLeft:'60px',marginBottom:'30px', marginTop:'30px'}}>
            <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1"><img style={{width:'100px', height:'50px'}}  src={require('./paypal.jpg')}/></label>
                        
                    </div>
            
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck2" />
                        <label className="custom-control-label" htmlFor="customCheck2"><img style={{width:'100px', height:'50px'}} htmlFor="customCheck2" src={require('./mastercard.jpg')}/></label>
                        
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck3" />
                        <label className="custom-control-label" htmlFor="customCheck3"><img style={{width:'100px', height:'50px'}} htmlFor="customCheck3" src={require('./visa.png')}/></label>
                        
                    </div>
            </div>
        </div>
        <div className="outButton">
            <button  className="btn btn-warning btn-block" onClick={()=>sendPayment()}>Pay</button>
        </div>
        </div>
        <div className="outInterest">
            <div style={{marginTop:'50px',width:'80%',marginLeft:'10%'}}>
                <button  className="btn btn-info btn-block" onClick={()=>{collectReward()}}>Collect My Rewards</button>
            </div>
    <div style={{textAlign:'center',marginTop:'30px'}}>{reward} local currency</div>
            <img style={{marginTop: '90px',marginLeft: '15%', width:'70%', height:'80px'}}  src={require('./interest.jpg')}/>
        </div>

    </div>
        )
}

export default Payment;