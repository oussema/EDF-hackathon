import React, {useEffect,useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import AdminPage from './Components/AdminPage/AdminPage';
import Payment from './Components/Payment/Payment';
const App = () => {

    return (<Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>EDF for Green Energy</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    
     
          <div className="auth-wrapper">
            <div >
              <Switch>
                <Route exact path='/' component={Login} />
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={Signup} />
                <Route path="/home" component={Home} />
                <Route path="/admin" component={AdminPage} />
                <Route path="/payment" component={Payment} />
              </Switch>
            </div>
            
          </div>
          
          
        </div></Router>
      );
}

export default App;