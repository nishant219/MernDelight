import React, {createContext, useContext, useEffect, useState} from "react"; 
import Cookies from 'js-cookie';
const AuthContext= createContext();

const useAuth=()=>{
    return useContext(AuthContext);
}

const AuthProvider=({children})=>{

    const [user, setUser]=useState(()=>{
        const storedUser= Cookies.get('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })

    useEffect(()=>{
        const storedUSer= Cookies.get('user');
        if(storedUSer){
            setUser(JSON.parse(storedUSer));
        }
    }, []);

    const login=(userData)=>{
        setUser(userData);
        Cookies.set('user', JSON.stringify(userData), {expires: 3});
    }

    const logout=()=>{
        setUser(null);
        Cookies.remove('user');
        localStorage.clear();
    }   

    const value={
        user,
        login,
        logout
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthProvider, useAuth};