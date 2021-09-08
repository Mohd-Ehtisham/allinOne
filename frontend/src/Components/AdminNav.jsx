import React from 'react'
import { useHistory } from 'react-router';

const AdminNav = () => {

    const history = useHistory();

    return (
            <div className="col-2 p-0 admin-div border">
                <p onClick={()=>history.push("/Adduser")}>Add User</p>
                <p onClick={()=>history.push("/DelUser")}>Delete User</p>
                <p onClick={()=>history.push("/Viewpost")}>View Post</p>
                <p onClick={()=>history.push("/DelPost")}>Delete Post</p>
            </div>
               
    )
}

export default AdminNav
