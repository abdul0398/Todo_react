import {useState} from "react"
import {useLocation, useNavigate} from "react-router-dom";
const Edit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {desc, duedate, assignemail, _id} = location.state.elem;
    const [user, setUser] = useState({desc, duedate, assignemail});
    const formHandler = async (e) => {
        e.preventDefault();
        console.log(user);
            await fetch(`/api/edit/${_id}`,{
                method:"POST",
                body: JSON.stringify(
                    {user:user}
                ),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            navigate('/');
    }
    const inputHandler = () => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }
    return (
        <div className="form">
            <form onSubmit={formHandler}>
                <div className="input-container">
                    <label>Task Description
                    </label>
                    <input type="text" name="desc" required
                        onChange={inputHandler}
                        value={
                            user.desc
                        }/>
                </div>
                <div className="input-container">
                    <label>Deadline
                    </label>
                    <input type="date" name="date" required
                        onChange={inputHandler}
                        value={
                            user.duedate
                        }/>
                </div>
                <div className="input-container">
                    <label>Assign email
                    </label>
                    <input type="email" name="email" required
                        onChange={inputHandler}
                        value={
                            user.assignemail
                        }/>
                </div>
                <div className="button-container">
                    <button className='btn-submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit
