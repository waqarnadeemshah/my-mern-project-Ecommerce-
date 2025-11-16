import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children,role}) {
    const {user,token}=useSelector((s)=>s.auth);
if(!token&&!user){
    return  <Navigate to={"/login"} />
}
if(role&&user.role!==role){
    return  <Navigate to={"/"} />
}
return children
}

export default ProtectedRoute
