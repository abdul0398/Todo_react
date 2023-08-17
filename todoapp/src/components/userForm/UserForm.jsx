import React from 'react'
import {useState, useEffect} from 'react'
import './userform.css';
const UserForm = () => {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [users, setUser] = useState([]);
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    console.log(userEmail);
    const inputHandler = (e) => {
        setEmail(e.target.value);
    }
    useEffect(()=>{
        const getUsers = async ()=>{
            const res = await fetch("/api/getUsers");
            const result = await res.json();
            console.log(result);
            setUser(result.users);
        }
        getUsers();
    },[])
    const formHandler = async (e)=>{
        e.preventDefault();
        try {
            const res = await fetch("/api/adduser", {
                method: "POST",
                body: JSON.stringify(
                    {email: email}
                ),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const result = await res.json();
            setUser(result.user.users);
            setMsg(result.msg);
            setEmail("");
        } catch (error) {
            setMsg("User Already invited");   
        }
        
    }
    const deleteHandler = async (e)=>{
        const id = e.target.value;
        const res = await fetch("/api/deluser", {
            method: "POST",
            body: JSON.stringify(
                {id: id}
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const result = await res.json();
        const filterUser = users.filter((user)=>{
            return user._id !== id
        })
        setUser(filterUser);
        setMsg(result.msg);
        
    }

    const resendHandler = async (e)=>{
        const email = e.target.value;
        const res = await fetch("/api/resend", {
            method: "POST",
            body: JSON.stringify(
                {email: email}
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        setMsg("Send sucessfully");
    }
    return (
        <div className="form">
            <p>{msg}</p>
            <form onSubmit={formHandler}>
                <div className="input-container">
                <label>Email
                </label>
                <input type="email" name="email" required
                    onChange={inputHandler}
                    value={email}/>
                </div>
                <div className="button-container">
                    <button className='btn-submit'>Submit</button>
                </div>
            </form>
            <div className='users-div'>
            <div ><div className='mail-div'><strong>users invited</strong></div> 
                    <strong>Action</strong>
                   <strong>status</strong>  
                    <strong>resend</strong>
                    </div>
            {users.map(user=>{
                    return <div className='mail-di' key={user._id}><div className='mail-div'>{user.email}</div> 
                   {user.email !== userEmail?<button value = {user._id} onClick={deleteHandler}>delete</button>:""} 
                    {user.isverified?"verified":"pending"}
                    {user.isverified?<div>verified</div>:<button value={user.email} onClick={resendHandler}>Resend</button>}
                    </div>
                })}
            </div>
                
        </div>
    )
}

export default UserForm;
