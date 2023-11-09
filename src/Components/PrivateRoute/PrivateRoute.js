import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(authContext)
    const location = useLocation()
    if(loading){
        return <button className="btn btn-square loading">Loading</button>
    }
    if(!user){
        return <Navigate to='/login' state={{from:location}} replace></Navigate>
    }
    return children;
};

export default PrivateRoute;