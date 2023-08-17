import {createContext, useState} from 'react'

export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:()=>{}
});


// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children })=>{
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const value = {currentUser, setCurrentUser, isLoading, setLoading}
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}