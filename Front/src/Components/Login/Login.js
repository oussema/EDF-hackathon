import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
const Login = () => {

    const [isFound,setIsFound]= useState (false);
    const [userEmail,setUserEmail]=useState ('');
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const form = e.target;
       

        const data = {
            email : form.elements['email'].value,
            password: form.elements['password'].value
        }

        let d = JSON.stringify(data);
        
        const response = await fetch("http://127.0.0.1:1234/users/login", {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: d
        });

        const l = await response.json();

        setIsFound(l.state);
    }
    
    if (isFound === "true") {
        return <Redirect to={{
            pathname: "/home",
            state: { userEmail: userEmail  }
          }} />
      }
   
    return (
        <form className="auth-inner" onSubmit={(event)=>handleSubmit(event)}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={(e)=>{setUserEmail(e.target.value)}}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name="password"/>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    );
}


export default Login;