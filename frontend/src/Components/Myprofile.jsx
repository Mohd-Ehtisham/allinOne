import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_STATECHANGE } from '../contextStore/actions/PostAction';

const Myprofile = () => {

    const [data, setdata] = useState([])

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    console.log(state.ArticleReducer);

    const handleChange = (e) =>{
        let key = e.target.name;
        let value = e.target.value;
        dispatch({
            type: POST_STATECHANGE,
            payload: {
                key,
                value
            }
        });
   
    }
    
    
    const viewPOst =async () =>{
        const email = state.loginReducer.email;
        const Login = await fetch("/getArticle",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({email})
        })  
        const res = await Login.json()
        if(res){
            state.ArticleReducer = res.myarticles;
        }
    }

    console.log(state.ArticleReducer);

    const handlePost = async (e) =>{
        e.preventDefault();
        const email = state.loginReducer.email;
        const title = state.PostReducer.title;
        const desc = state.PostReducer.desc;
        const Login = await fetch("/newarticle",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({email,title,desc})
        })
        const res = await Login.json();
        if(res){
            alert('data added')
        }
    }

    useEffect(() => {
        viewPOst();
        setdata(state.ArticleReducer)
    }, [])


    return (
        <div>
            <h1 className="text-center">My Profile</h1>
            <div className="text-center">
            
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                New Post
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">New Post</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        <form  method="post" onSubmit={handlePost}>
                            <h6>{state.loginReducer.email}</h6>
                            <p>Title</p>
                            <input type="text" className="border" 
                             onChange={handleChange} value={state.PostReducer.title} name="title"/> <br />
                            <p>Description</p>
                            <input type="text" className="border" 
                             onChange={handleChange} value={state.PostReducer.desc} name="desc"/> <br />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">POST</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="container text-center">

                <div className="row">
                                <div className="col-6">
                                    <h3 className="text-uppercase">Title</h3>
                                </div>
                                <div className="col-6">
                                    <h3 className="text-uppercase">Description</h3>
                                </div>
                            </div>
            </div>
            {
                data.map((val)=>{
                    return<>

                        <div className="container text-center">
                            <div className="row">
                                <div className="col-6">
                                    <h6>{val.title}</h6>
                                </div>
                                <div className="col-6">
                                    <p>{val.desc}</p>
                                </div>
                            </div>
                        </div>
                    </>
                })
            }
        </div>
    )
}

export default Myprofile