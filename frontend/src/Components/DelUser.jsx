import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DELETEUSER_STATECHANGE } from '../contextStore/actions/DeleteActions';
import AdminNav from './AdminNav';

const Deluser = () => {

    const state = useSelector(state => state)
    const dispatch = useDispatch();

    console.log(state);

    console.log(state.DelUser.Useremail);

    const handleChange = (e) =>{
        let key=e.target.name;
        let value=e.target.value;
        dispatch({
            type:DELETEUSER_STATECHANGE,
            payload:{
                key,
                value
            }
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const Useremail = state.DelUser.Useremail;
        const del = await fetch("/deleteUser",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({Useremail})
        })
        const res = await del.json();
        if(res){
            alert("User Deleted")
        }else{
            alert("Something Went Wrong")
        }
    }

    return (
        <div className="Admin-div">
        <div className="row">
               <AdminNav/>
            <div className="col-9 add-user text-center">
                <form method="post" onSubmit={handleSubmit}>
                    <input type="text" name="Useremail" value={state.DelUser.Useremail}  onChange={handleChange} placeholder="Enter User Email"/> <br />
                    <button type="submit" className="btn btn-outline-danger">Submit</button>
                </form>
            </div>
        </div>
    </div>
       
    )
}

export default Deluser
