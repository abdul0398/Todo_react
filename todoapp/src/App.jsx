import "./App.css";
import {Route, Routes} from "react-router-dom";
import {useEffect, useContext} from "react";
import {UserContext} from "./Context/User.context";
import axios from "axios";
import Navbar from "./components/nav/Navbar";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from "./utils/ProtectedRoute";
import TaskForm from "./components/TaskForm/TaskForm";
import Edit from "./components/editform/Edit";
import UserForm from "./components/userForm/UserForm";

function App() {
    const {setCurrentUser} = useContext(UserContext);
    // useEffect(() => {
    //     (async function () {
    //         try {
    //             const res = await axios.get('/api/start');
    //             if (res.status == 200) {
    //                 setCurrentUser(res.data);
    //             } else 
    //                 return;
                
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     })()
    // }, []);
    return (
        <>
            <Navbar/>
            <Routes>
                <Route element={<Login/>}
                    path="/login"/>
                
                <Route element={
                        <ProtectedRoute><UserForm/></ProtectedRoute>
                    }
                    path="/addUser"/>
                    <Route element={
                        <ProtectedRoute><Dashboard/></ProtectedRoute>
                    }
                    path="/"/>
                <Route element={<Signup/>}
                    path="/register"/>

                <Route element={
                        <ProtectedRoute><TaskForm/></ProtectedRoute>
                    }
                    path="/taskform"/>
                    <Route element={
                        <ProtectedRoute><Edit/></ProtectedRoute>
                    }
                    path="/edit"/>
            </Routes>
        </>
    )
}
export default App;
