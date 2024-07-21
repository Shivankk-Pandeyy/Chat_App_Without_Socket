/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom"
import Header from "./Component/Header"
import PIC from "./PIC.png"
import axios from "axios";
import { useEffect, useState } from "react";
const HomePage = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    window.sessionStorage.setItem("ID",id);
    const [userList,setUserList]=useState([]);
    const [search,setSearch]=useState("");
    const GetUsers=async()=>{
        try{
            const response=await axios.get("http://localhost:5000/ChatApp/AllUsers");
            setUserList(response.data);
        }
        catch(err){
            console.log(err);
        }
    }
    const OpenChat=(e)=>{
            navigate(`/OpenChat/${e}`);
    }
    useEffect(()=>{
        GetUsers();
    },[]);
return (
    <>
    <Header/>
    <div className="Homepage">
    <h2>WELCOME TO THE DEN </h2>
    <div className="Homepage-search">
    <input type="text" placeholder="ENTER NAME/EMAIL" autoComplete="off" name="search" onChange={(e)=>setSearch(e.target.value)}></input>
    </div>
    <div className="Homepage-display">
    {
        userList.map((val)=>{
            if(search===val.name||search===val.email){
                return(
                    <div className="Homepage-display-card-found" key={val._id}>
                    <img src={PIC} alt="PIC"></img>
                    <h2>{val.name}</h2>
                    <h2>{val.email}</h2>
                    <button>CHAT</button>
                    </div>
                )
            }
        })
    }
    {
        userList.map((val)=>{
            if(val._id!==id){
                return(
                    <div className="Homepage-display-card" key={val._id}>
                    <img src={PIC} alt="PIC"></img>
                    <h2>{val.name}</h2>
                    <h2>{val.email}</h2>
                    <button onClick={(e)=>OpenChat(val._id)}>CHAT</button>
                    </div>
                )
            }
        })
    }
    </div>
    </div>
    </>
)
}
export default HomePage