import "./dashboard.css";
import {Link} from "react-router-dom"
import {useEffect, useState} from "react";
const Dashboard = () => {
    const [tasks, settasks] = useState([]);
    const [filterTasks, setfiltertasks] = useState([]);
    const id = JSON.parse(localStorage.getItem('user'));
    const delHandler = async (e) => {
        const id = e.target.value;
        const res = await fetch("/api/del", {
            method: "POST",
            body: JSON.stringify(
                {id: id}
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const uptasks = tasks.filter(task=>{
            return task._id !== id;
        })
        settasks(uptasks);
    }
    const filterHandler = async (e)=>{
        const statusCode = e.target.value;
        if(statusCode === 'all'){
            setfiltertasks(tasks);
        }else if(statusCode === "pending"){
            console.log(tasks[0])
            const newArr = tasks.filter(elem=>{return elem.status === "pending"});
            setfiltertasks(newArr);
        }else{
            const newArr = tasks.filter(elem=>{return elem.status === "done"});
            setfiltertasks(newArr);
        }
    }
    const statusHandler = async (event)=>{
        const id = event.target.value;
        await fetch('/api/status',{
            method:"POST",
            body:JSON.stringify({
                id:id
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })

    }
    const showtasks = async () => {
        
        const res = await fetch("/api/gettasks", {
            method: "POST",
            body: JSON.stringify(
                {id: id}
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await res.json();
        settasks(data);
        setfiltertasks(data);
    }
    useEffect(() => {
         showtasks();
    }, [tasks]);

    return (
        <div className="main-task-container">
            <div className="status-btn-container">
                <button className="btn-status" onClick={filterHandler} value="all">All</button>
                <button className="btn-status" onClick={filterHandler} value="pending">Pending</button>
                <button className="btn-status" onClick={filterHandler} value="done">Done</button>
            </div>

            <div className="task-container">
                <div className="tasks-headings">
                    <div>
                        <h3>Description</h3>
                    </div>
                    <div>
                        <h3>Due Date</h3>
                    </div>
                    <div>
                        <h3>Assigned email</h3>
                    </div>
                    <div>
                        <h3>status</h3>
                    </div>
                    <div>
                        <h3>Actions</h3>
                    </div>
                    <div>
                        <h3>Mark as Done</h3>
                    </div>
                </div>
                {filterTasks.map(elem => { // eslint-disable-next-line react/jsx-key
            return <div className="tasks">
                <div> {
                    elem.desc
                } </div>
                <div> {
                    elem.duedate
                } </div>
                <div> {
                    elem.assignemail
                } </div>
                <div> {
                    elem.status
                } </div>
                <div><button value={
                        elem._id
                    }
                    className="del-btn"
                    onClick={delHandler}>X</button>
                <Link to='/edit'
                    state={
                        {elem: elem}
                }>Edit</Link></div>
                {elem.status == "done"?"Already completed":<div><button value={elem._id} onClick={statusHandler}>Done</button></div>}
                
                
            </div>
        })} </div>
        </div>

    )
}
export default Dashboard;
