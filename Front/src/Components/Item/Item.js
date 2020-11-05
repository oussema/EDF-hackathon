import React from 'react' ;
import './Item.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Item = ({itemName,itemType,userEmail,projectNumber})=> {
    return (
    <div className="shadowMyStyle">
        <div className="containerMystyle">
            <div>{itemName}</div>
            <img src={require ('../../../src/Images/'+itemType+'.jpg')} className="imageStyle" />
        </div>  
        <Link to={{ 
            pathname: '/payment',
            state: { userEmail: userEmail , projectNumber}}}>
                <button  className="btn btn-success btn-block">Invest</button></Link>  
    </div>)
}

export default Item;