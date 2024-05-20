import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({ isAuth: false, token: "", setAuth: () => { } })

export const AuthProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(localStorage.getItem("isAuth") || false)
    const [token, setToken] = useState(localStorage.getItem("token"))
    useEffect(() => {
        localStorage.setItem("isAuth", isAuth)
    }, [isAuth])
    return (
        <AuthContext.Provider value={{ isAuth, token, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
