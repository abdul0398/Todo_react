import "./login.css";
import {useState, useContext} from 'react';
import {UserContext} from '../../Context/User.context';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [userDetails, setUser] = useState({email: "", password: ""});
    const {setCurrentUser} = useContext(UserContext);
    const [validate, setValidate] = useState("");
    


    const inputHandler = (event) => {
        setUser({
            ...userDetails,
            [event.target.name]: event.target.value
        });
    }


    const formHandler = async (e) => {
        e.preventDefault();
        axios.post("/api/login", {
            email: userDetails.email,
            password: userDetails.password,
            withCredentials: true
        },).then(res => {
            const user = res.data;
            localStorage.setItem("user", JSON.stringify(res.data));
            setCurrentUser(user);
            setUser({email: "", password: ""});
            navigate('/');
        }).catch(error => {
            setValidate(error.response.data);
        });
    }
    return (
        <div className="form">
            <form onSubmit={formHandler}>
                <div className="input-container">
                    <label>Email
                    </label>
                    <input type="email" name="email" required
                        onChange={inputHandler}
                        value={
                            userDetails.email
                        }/>
                </div>
                <div className="input-container">
                    <label>Password
                    </label>
                    <input type="password" name="password" required
                        onChange={inputHandler}
                        value={
                            userDetails.password
                        }/>
                </div>
                <div className="button-container">
                    <button className="btn-submit">Submit</button>
                </div>
            </form>
            <div className="validate"> {validate} </div>
        </div>
    )
}
export default Login;
