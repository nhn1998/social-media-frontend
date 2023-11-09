import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import app from '../../firebase.config';

export const authContext = createContext();
const AuthProvider = ({children}) => {
    const [user,setUser] = useState('')
    const [loading,setLoading]=useState(true)
    const auth = getAuth(app)

    const register = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const login = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setLoading(false)
            setUser(currentUser)
        })
        return ()=>{
            unsubscribe()
        }
    },[])
    const authInfo = {user,register,login,logout,loading}
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;