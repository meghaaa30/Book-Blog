import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    // Load the authentication state from local storage on mount
    useEffect(() => {
        const authStatus = localStorage.getItem('auth-token') ? true : false;
        setIsAuth(authStatus);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
