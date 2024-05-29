import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authToken = localStorage.getItem('auth-token');
        if (authToken) {
            setIsAuth(true);
        }
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
