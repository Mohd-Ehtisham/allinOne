import React from 'react'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {ADDUSER_STATECHANGE} from '../contextStore/actions/Adduser'
import AdminNav from './AdminNav';

const Register = () => {

    const history = useHistory();

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    console.log(state.AdduserReducer)

    const handleChange = (e) =>{
        let key = e.target.name;
        let value = e.target.value;
        dispatch({
            type: ADDUSER_STATECHANGE,
            payload: {
                key,
                value
            }
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const role = state.AdduserReducer.role;
        const name = state.AdduserReducer.name;
        const email = state.AdduserReducer.email;
        const password = state.AdduserReducer.password;
        const reg = await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({role,name,email,password})
        })
        const res = await reg.json();
        if(res){
            alert("User Registered")
            history.push("/admin")

        }else{
            alert("Something went wrong")
        }
    }

    return (
        <div className="Admin-div">
        <div className="row">
               <AdminNav/>
            <div className="col-9">
            <div className="add-user text-center mt-5">
            <form method="POST" onSubmit={handleSubmit}>
                <input type="number" placeholder="Enter role" name="role"
                    value={state.AdduserReducer.role} onChange={handleChange}/> <br />
                <input type="text" placeholder="Enter name" name="name"
                    value={state.AdduserReducer.name} onChange={handleChange}/> <br />
                <input type="text" placeholder="Enter email" name="email"
                    value={state.AdduserReducer.email} onChange={handleChange}/> <br />
                <input type="" placeholder="Enter Password" name="password"
                    value={state.AdduserReducer.password} onChange={handleChange}/> <br />
                <button type="submit" className="btn btn-outline-success">Register</button>
            </form>
        </div>
            </div>
        </div>
    </div>
        
    )
}

export default Register