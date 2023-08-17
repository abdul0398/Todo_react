import {Navigate} from "react-router-dom"
import { UserContext } from "../Context/User.context";
import { useContext } from "react";
const ProtectedRoute = ({children}) => {
    const user = localStorage.getItem('user');
    console.log(user);
    if(!user) {
        return <Navigate to="/login" replace />
    }
 return children

};

export default ProtectedRoute;