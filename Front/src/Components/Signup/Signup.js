import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

const Signup = () => {
    const [isSignUped, setIsSignUped]= useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const form = e.target;
       

        const data = {
            email : form.elements['email'].value,
            password: form.elements['password'].value,
            firstName: form.elements['firstName'].value,
            lastName: form.elements['lastName'].value,
            walletAddress : form.elements['walletAddress'].value
        }

        let d = JSON.stringify(data);

        const response = await fetch("http://127.0.0.1:1234/users/create", {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: d
        });

        const l = await response.json();
        
        setIsSignUped(true);
    }
    
    if (isSignUped === true){
        return <Redirect to={{
            pathname: "/sign-in"
          }} />
    }
    return (
        <form className="auth-inner"  onSubmit={(event)=>{handleSubmit(event)}}>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" name="firstName"/>
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" name="lastName"/>
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" name="email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name="password" />
            </div>
            <div className="form-group">
                <label>WalletAdress</label>
                <input type="text" className="form-control" placeholder="Enter address" name="walletAddress" />
            </div>
            <button type="submit" className="btn btn-primary btn-block" >Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
            </p>
        </form>
    );
}

export default Signup;