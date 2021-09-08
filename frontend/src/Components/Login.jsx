import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_STATECHANGE } from '../contextStore/actions/LoginAction';

const Login = () => {

    const history = useHistory();

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    console.log(state);

    const handleChange = (e) =>{
        let key = e.target.name;
        let value = e.target.value;
        dispatch({
            type: LOGIN_STATECHANGE,
            payload: {
                key,
                value
            }
        });
   
    }
    
     const handleSubmit = async (e) =>{
        e.preventDefault();
        const email = state.loginReducer.email
        const password = state.loginReducer.password
        const Login = await fetch("/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({email,password})
        })
        const res = await Login.json()
        if(res){
            state.ArticleReducer = res.myarticles;
            if(res.loginDetails.role === 2){
                history.push("/admin")
            }else if(res.loginDetails.role === 1){
                history.push("/myprofile")
            }
        }else{
            alert("Invalid Details")
        }
     }
     
     const handleAdmin=async()=>{
        try {
            const res = await fetch('/admin', {
                method: "GET", 
                headers: { 
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
 
            const data = await res.json();
            console.log(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }
        catch (error) {
            history.push("/");
            // alert("login please")
            console.error(error);
        }
    }

    useEffect(() => {
        handleAdmin();
    }, [])
     
    return (
        <div className="App">
            <div className="login-div"> 
                <h1>Login</h1>
                <div className="form-div add-user">
                    <form method="POST" onSubmit={handleSubmit}>
                        <input type="text" name="email" placeholder="Enter Email"
                            value={state.loginReducer.email} onChange={handleChange}/> <br />
                        <input type="password" name="password" placeholder="Enter Password"
                            value={state.loginReducer.password} onChange={handleChange}/>
                        <br />
                        <button type="submit" className="btn btn-outline-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
