import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'

const ViewPost = () => {

    const [Postdata, setPostdata] = useState([]);

    const viewPOst =async () =>{
        const Login = await fetch("/getArticles",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
        })  
        const res = await Login.json();
        console.log(res.data);
        setPostdata(res.data)
    }

    useEffect(() => {
        viewPOst();
    }, [])

    return (
        <div className="Admin-div">
        <div className="row">
               <AdminNav/>
            <div className="view-post col-9">
                <h1>All POST</h1>
                <div className="row">
                    <div className="col-4">
                        <h4>Title</h4>
                    </div>
                    <div className="col-4">
                        <h4>Description</h4>
                    </div>
                    <div className="col-4">
                        <h4>Posted by</h4>
                    </div>
                </div>
                {
                    Postdata.map((val)=>{
                        return<>
                            <div className="row">
                                <div className="col-4">
                                    <h6>{val.title}</h6>
                                </div>
                                <div className="col-4">
                                <h6>{val.desc}</h6>
                                </div>
                                <div className="col-4">
                                <p>{val.email}</p>
                                </div>
                            </div>
                        </>
                    })
                }
            </div>
        </div>
    </div>
    )
}

export default ViewPost
