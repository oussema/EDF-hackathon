import React, {useEffect, useState} from 'react';
import List from '../List/List';
import './Home.css'
const Home = ({location})=> {
    
    return (
    <div >
            
            <List userEmail={location.state.userEmail} ></List>
    </div>
    )
}

export default Home;