import Header from "./Component/Header"
import './Chat.css'
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
const User = () => {
    const {id}=useParams();
    window.sessionStorage.setItem("ID",id);
    const [user,setUser]=useState({
        name:"",
        password:"",
    })
    const [details,setDetails]=useState({
        name:"",
        email:"",
        join:"",
    })
    const getUser=async()=>{
        try{
            const response=await axios.get("http://localhost:5000/ChatApp/SingleUser/"+id);
            setUser({
                name:response.data.name,
                password:"",
            })
            setDetails({
                name:response.data.name,
                email:response.data.email,
                join:response.data.createdAt,
            })
        }
        catch(err){
            console.log(err);
        }
    }
    const UserDetails=(e)=>{
        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        });
    }
    const UpdateDetails=async(e)=>{
        e.preventDefault();
        if(user.name===""||user.email===""||user.password===""){
            return alert("MAND")
        }
        else{
            try{
                const response=await axios.put(`http://localhost:5000/ChatApp/UpdateUser/{id}`,user);
                console.log(response.data);
            }
            catch(err){
                if(err.response.data.message==="EMAIL"){
                    return alert("EMAIL");
                }
            }
        }
    }
    useEffect(()=>{
        getUser();
    },[]);
return(
    <>
    <Header/>
    <div className="user-info">
    <div className="user-info-1">
    <h2>MY INFORMATION</h2>
    <div className="user-info-box">
    <p>NAME: {details.name}</p>
    </div>
    <div className="user-info-box">
    <p>EMAIL: {details.email}</p>
    </div>
    <div className="user-info-box">
    <p>JOINED: {details.join}</p>
    </div>
    </div>
    <div className="user-info-2">
    <h2>UPDATE INFORMATION</h2>
    <form onSubmit={UpdateDetails}>
    <input type="text" placeholder="UPDATE NAME" name="name" autoComplete="off" value={user.name} onChange={UserDetails}></input>
    <input type="password" placeholder="UPDATE PASSWORD" name="password" autoComplete="off" onChange={UserDetails}></input>
    <button>UPDATE</button>
    </form>
    </div>
    </div>
    </>
)
}
export default User