/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PIC from "./PIC.png"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Component/Header"
import CPIC from "./USER.gif"
const UserChats = () => {
    const {id}=useParams();
    window.sessionStorage.setItem("ID",id);
    const navigate=useNavigate();
    const [users,setusers]=useState([]);
    const GetUsers=async()=>{
        try{
            const response=await axios.get("http://localhost:5000/ChatApp/AllUsers");
            setusers(response.data);
        }
        catch(err){
            console.log(err);
        }
    }
    console.log(window.sessionStorage.getItem("ID"));
    const OPENCHAT=(e)=>{
        navigate(`/OpenChat/${e}`);
    }
    useEffect(()=>{
        GetUsers();
    },[]);
return (
    <>
    <Header/>
    <div className="chat">
    <div className="chat-name">
    {
        users.map((val)=>{
            if(val._id!==id){
                return(
                    <div className="chat-name-holder" key={val._id}>
                    <div className="chat-name-holder-pic">
                    <img src={PIC} alt="PROFILE PIC"></img>
                    </div>
                    <div className="chat-name-holder-info">
                    <p>{val.name}</p>
                    <p>{val.email}</p>
                    </div>
                    <div className="chat-name-holder-but">
                    <button onClick={(e)=>OPENCHAT(val._id)}>CHAT</button>
                    </div>
                    </div>
                )
            }
        })
    }
    </div>
    <div className="chat-pic">
    <img src={CPIC} alt="ENTER THE DEN"></img>
    </div>
    </div>
    </>
)
}
export default UserChats