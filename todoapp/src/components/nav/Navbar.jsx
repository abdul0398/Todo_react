import {Link} from 'react-router-dom'
import "./navbar.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../Context/User.context';
import {useContext} from 'react';
const Navbar = () => {
    const {setCurrentUser, currentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const logOutHandler = async () => {
        await axios.post('/api/logout', {withCredentials: true})
        localStorage.clear();
        setCurrentUser("");
        navigate('/login');

        return;
    }
    return (
        <div className='nav'>
            <h2>EasyTasks</h2>
            <ul className='navItem'>
                {
                ! user ? null : <>
                    <li>
                        <Link className='link' to="/addUser">Add User</Link>
                    </li>
                    <li>
                        <Link className='link' to="/taskform">createtask</Link>
                    </li>
                </>
            }
                {
                ! user ? null : <li>
                    <Link className='link' to="/">Tasks</Link>
                </li>
            }
                {
                user ? <li>
                    <Link className='link'
                        onClick={
                            () => {
                                logOutHandler()
                            }
                    }>Logout</Link>
                </li> : <>

                    <li>
                        <Link className='link' to="/login">Login</Link>
                    </li>
                    <li>
                        <Link className='link' to="/register">Register</Link>
                    </li>
                </>
            } </ul>
        </div>
    )
}

export default Navbar
