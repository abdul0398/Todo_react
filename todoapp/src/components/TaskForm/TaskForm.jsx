import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
const TaskForm = () => {

    const [user, setUser] = useState({desc: "", date: "", email: ""});
    const [assignusers, setassignUser] = useState([]);
    const navigate = useNavigate();
    const inputHandler = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }
    useEffect(()=>{
        const getUsers = async ()=>{
            const res = await fetch("/api/getUsers");
            const result = await res.json();
            const filterusers = result.users.filter(user=>{
                return user.status !== "pending";
            })
            console.log(filterusers);
            setassignUser(filterusers);
        }
        getUsers();
    },[])
    const formHandler = async (e) => {
        e.preventDefault();
        console.log(user);
        const id = JSON.parse(localStorage.getItem("user"));
        e.preventDefault();
        const res = await fetch("/api/createtask", {
            method: "POST",
            body: JSON.stringify(
                {desc: user.desc, assignemail: user.email, duedate: user.date, createdBy: id}
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if (res.status == 200) {
            navigate('/');
        }

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
                            user.date
                        }/>
                </div>
                
                <div className="input-container">
                    <label>Choose a membership plan:</label>
                    <select required value={user.email} name="email" onChange={inputHandler} id="membership">
                    {assignusers.map((elem)=>{
                    return <option key={elem._id} value={elem.email}>{elem.email}</option>
                })}
                    </select></div>
                <div className="button-container">
                    <button className='btn-submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm
