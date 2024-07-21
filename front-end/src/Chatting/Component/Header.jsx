import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./Component.css";
import { useEffect} from "react";
import axios from "axios";
const Header = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    const status={status:"ONLINE"};
    const LO={status:"OFFLINE"};
    const setStatus=async()=>{
        try{
            const response=await axios.put(`http://localhost:5000/ChatApp/SetStatus/${id}`,status);
            console.log(response.data.message)
        }
        catch(err){
            console.log(err);
        }
    }
    const LOGOUT=async()=>{
        try{
            const response=await axios.put(`http://localhost:5000/ChatApp/SetStatus/${id}`,LO);
            console.log(response.data.message);
            navigate("/Register");
        }
        catch(err){
            console.log(err);
        }
        
    }
    useEffect(()=>{
        setStatus();
    },[]);
return (
    <div className="header">
    <div className="header-link">
    <NavLink to={`/Welcome/${id}`}>Homepage</NavLink>
    <NavLink to={`/MyChats/${id}`}>MyChats</NavLink>
    <NavLink to={`/MyProfile/${id}`}>MyProfile</NavLink>
    </div>
    <div className="header-logout">
    <button onClick={LOGOUT}>LOGOUT</button>
    </div>
    </div>
)
}
export default Header