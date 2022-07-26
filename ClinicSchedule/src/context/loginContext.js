import React, { createContext, useState } from 'react';

const LoginContext = createContext(0);

export const LoginContextProvider = ({children}) => {
    
    const [user, setUser] = useState("");
    const [typeUser, setTypeUser] = useState("");
    const [loadingButtonSubmit, setLoadingButtonSubmit] = useState(false);

    return (
        <LoginContext.Provider
            value={{
                user,
                typeUser,
                setUser,
                setTypeUser,
                loadingButtonSubmit, 
                setLoadingButtonSubmit
            }}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginContext; 