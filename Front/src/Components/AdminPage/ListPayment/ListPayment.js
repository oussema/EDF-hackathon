import React, { useEffect, useState } from 'react' ;
import PaymentItem from '../PaymentItem/PaymentItem';
const ListPayment = ()=> {
    const [payments,setPayments]=useState([]);
    const [fix]=useState(0);
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch("http://127.0.0.1:1234/payments/allNotHandled", {
                method:"GET",
                headers: { 'Content-Type': 'application/json' }
            });
    
            const data = await response.json();
    
            console.log(data);
            setPayments(data.payment);
        }
        fetchData();
    }
        
        ,[fix]);
    return (
    <div style={{width:'50%',marginTop:"30px"}}>
        <div style={{display:'flex',justifyContent:'left',marginBottom:'10px'}}>
            <div style={{marginLeft:'10px', width:"200px", height:"40px"}}>Client </div> 
            <div style={{marginLeft:'10px', width:"100px", height:"40px"}}>Project Number</div>  
            <div style={{marginLeft:'10px', width:"100px", height:"40px"}}>Contribuation Amount</div> 
        </div>
         <div>{payments.map((elem)=>(
            <PaymentItem key ={elem._id} id={elem._id} address={elem.email} projectNumber={elem.projectNumber} amount={elem.amount}></PaymentItem>
         ))}</div>
    </div>
    )
}

export default ListPayment;