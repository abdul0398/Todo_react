import {useState, useContext} from 'react';
import {UserContext} from '../../Context/User.context';
import {useNavigate} from "react-router-dom";
const Signup = () => {
    const [user, setUser] = useState({email: "", password: "", name: "", confirmPassword: ""});
    const [validation, setValidation] = useState("");
    const {setCurrentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const inputHandler = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }
    const formHandler = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setValidation("password doesn't match");
            return;
        }

        console.log("inside form handler")
        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(
                {name: user.name, email: user.email, password: user.password}
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        const user2 = await res.json();
        if (res.status != 200) {
            setValidation(user2);
        } else {
            setCurrentUser(user2.user);
            localStorage.setItem("user", JSON.stringify(user2.user));
            setUser({email: "", password: "", name: "", confirmPassword: ""});
            setValidation("");
            navigate('/');
        }

    }

    return (
        <div className="form">
            <form onSubmit={formHandler}>
                <div className="input-container">
                    <label>Name
                    </label>
                    <input type="text" name="name" required
                        onChange={inputHandler}
                        value={
                            user.name
                        }/>
                </div>
                <div className="input-container">
                    <label>Email
                    </label>
                    <input type="email" name="email" required
                        onChange={inputHandler}
                        value={
                            user.email
                        }/>
                </div>
                <div className="input-container">
                    <label>Password
                    </label>
                    <input type="password" name="password" required
                        onChange={inputHandler}
                        value={
                            user.password
                        }/>
                </div>
                <div className="input-container">
                    <label>confirmPassword
                    </label>
                    <input type="password" name="confirmPassword" required
                        onChange={inputHandler}
                        value={
                            user.confirmPassword
                        }/>
                </div>
                <div className="button-container">
                    <button className='btn-submit'>Submit</button>
                </div>
                 </form>
                 <div className="validate"> {validation} </div>
        </div>
    )
}

export default Signup;
