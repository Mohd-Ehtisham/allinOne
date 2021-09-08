import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DELETEPOST_STATECHANGE } from '../contextStore/actions/DeleteActions';
import AdminNav from './AdminNav';

const DelPost = () => {

    const state = useSelector(state => state)
    const dispatch = useDispatch();

    console.log(state.Delpost);

    const handleChange = (e) =>{
        let key=e.target.name;
        let value=e.target.value;
        dispatch({
            type:DELETEPOST_STATECHANGE,
            payload:{
                key,
                value
            }
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const title = state.Delpost.title;
        console.log(title);
        const del = await fetch("/deleteArticle",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({title})
        })
        const res = await del.json();
        if(res.status === 422 || res.status === 522){
            alert("Something Went Wrong")
        }else{
            alert("Post Deleted")
        }
    }

    return (
        <div className="Admin-div">
        <div className="row">
               <AdminNav/>
            <div className="col-9 add-user text-center">
                <form method="post" onSubmit={handleSubmit}>
                    <input type="text" name="title" value={state.Delpost.title} onChange={handleChange} placeholder="Enter Title"
                         /> <br />
                    <button type="submit" className="btn btn-outline-danger">Submit</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default DelPost
