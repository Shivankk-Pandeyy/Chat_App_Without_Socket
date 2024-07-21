import { useEffect, useRef, useState } from "react";
import PIC from "./PIC.png"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Chat = () => {
    const navigate=useNavigate();
    const A1=()=>toast.warning("WRITE SOMETHING TO SEND");
    const A2=()=>toast.success("MESSAGE SENT");
    const messageEnd=useRef(null);
    const {id}=useParams();//RECV ID
    const SID=window.sessionStorage.getItem("ID");//SENDER ID
    const RID=id;//RECV ID
    const [Bundle,setBundle]=useState([]);
    const GetBundle=async()=>{
        try{
            const response=await axios.get(`http://localhost:5000/ChatApp/SingleUser/${SID}`);
            setBundle(response.data.message);
        }
        catch(err){
           // console.log(err);
        }
    }
    const [Message,setMessage]=useState({
        sendID:SID,
        recvID:RID,
        Msg:"",
    });
    const [recvinfo,setRecvInfo]=useState({
        name:"",
        email:"",
        status:"",
    });
    const handleMessage=(e)=>{
        const {name,value}=e.target;
        setMessage({
            ...Message,
            [name]:value
        });
    }
    const submitMessage=async()=>{
        if(Message.Msg===""){
            return A1();
        }
        else{
            try{
                const response=await axios.put(`http://localhost:5000/ChatApp/AddMessage/${SID}`,Message);
                console.log(response);
                setMessage({
                    ...Message,
                    recvID:RID,
                    Msg:"",
                })
                return A2();
            }
            catch(err){
                //console.log(err);
            }
        }
    }
    const GetRecvInfo=async()=>{
            try{
                const response=await axios.get("http://localhost:5000/ChatApp/SingleUser/"+RID);
                //console.log(response.data);
                setRecvInfo({
                    name:response.data.name,
                    email:response.data.email,
                    status:response.data.status,
                });
            }
            catch(err){
               // console.log(err);
            }
    }
    const RemoveID=()=>{
        navigate(`/MyChats/${SID}`)
        window.sessionStorage.removeItem("ID");
    }
    useEffect(()=>{
        GetRecvInfo();//TO DISPLAY RECV INFO
        GetBundle();//TO GET MESSAGES BUNDLE
        messageEnd.current?.scrollIntoView();
    },[submitMessage]);
return (
    <div className="CHAT-box">
    <div className="chatting">
    <ToastContainer hideProgressBar={true} theme="dark" autoClose={2000}/>
    <div className="chat-header">
    <img src={PIC} alt="PROFILE PIC"></img>
    <h2>{recvinfo.name}</h2>
    <h2>{recvinfo.email}</h2>
    <h2>{recvinfo.status}</h2>
    <button onClick={RemoveID}>RETURN</button>
    </div>
    <div className="chat-section">
    {
        Bundle.map((val,i)=>{
            if(val.sendID===SID && val.recvID===RID){
                return(
                    <div className="s-box" key={i}>
                        <h2>{val.Msg}</h2>
                    </div>
                )
            }
            else if(val.sendID===RID && val.recvID===SID){
                return(
                        <div className="r-box" key={i}>
                        <h2>{val.Msg}</h2>
                        </div>
                )
            }
        })
    }
    <div ref={messageEnd}/>
    </div>
    <div className="chat-input">
    <input type="text" placeholder="ENTER MESSAGES" autoComplete="off" name="Msg" onChange={handleMessage} value={Message.Msg}></input>
    <button onClick={submitMessage}>SEND</button>
    </div>
    </div>
    </div>
)
}

export default Chat