import {NavLink, useNavigate} from 'react-router-dom';
import './Home.css';
import LOGO from './LOGO.png';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const A1=()=>toast.warning("ALL FIELDS ARE MANDATORY");
    const A2=()=>toast.error("INVALID NAME");
    const A3=()=>toast.error("INVALID EMAIL");
    const A4=()=>toast.error("INVALID USER");
    const A5=()=>toast.error("INVALID PASSWORD");
    const A6=()=>toast.error('USER ALREADY EXISTS');
    const navigate=useNavigate();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const nameRegex=/^[A-Za-z]/;
    const [Login,setLogin]=useState({
        email:"",
        password:"",
    });
    const [Signup,setSignup]=useState({
        name:"",
        email:"",
        password:"",
    });
    const LoginData=(e)=>{
        const {name,value}=e.target;
        setLogin({
            ...Login,
            [name]:value
        })
    };
    const SignupData=(e)=>{
        const {name,value}=e.target;
        setSignup({
            ...Signup,
            [name]:value
        })
    };
    const submitLogin=async(e)=>{
        e.preventDefault();
        if(Login.email===""||Login.password===""){
            return A1();
        }
        else{
            try{
                const response=await axios.post("http://localhost:5000/ChatApp/Login",Login);
                if(response.data.message==="LOGIN"){
                    navigate(`/Welcome/${response.data.id}`);
                }
                setLogin({
                    email:"",
                    password:"",
                })
            }
            catch(err){
                if(err.response.data.message==="USERX"){
                    setLogin({
                        ...Login,
                        email:"",
                        password:"",
                    })
                    return A4();
                }
                else if(err.response.data.message==="PASSWORD"){
                    setLogin({
                        ...Login,
                        password:"",
                    })
                    return A5();
                }
            }
        }
    }
    const submitSignup=async(e)=>{
        e.preventDefault();
        const nameBool=nameRegex.test(Signup.name);
        const emailBool=emailRegex.test(Signup.email);
        if(Signup.email===""||Signup.password===""||Signup.name===""){
            return A1();
        }
        else if(!nameBool){
            return A2();
        }
        else if(!emailBool){
            return A3();
        }
        else{
            try{
                const response=await axios.post("http://localhost:5000/ChatApp/Register",Signup);
                if(response.data.message==="CREATED"){
                    navigate(`/Welcome/${response.data.id}`);
                }
                setSignup({
                    name:"",
                    email:"",
                    password:"",
                })
            }
            catch(err){
                if(err.response.data.message==="EMAIL"){
                    setSignup({
                        name:"",
                        email:"",
                        password:"",
                    })
                    return A6();
                }
            }
        }
    }
return (
    <div className="login">
    <ToastContainer hideProgressBar={true} theme="dark" autoClose={2000}/>
    <div className='login-1'>
    <img src={LOGO} alt='OUR LOGO'></img>
    <h2>ENTER THE DEN</h2>
    <p>Enter the lion den to roar with us!</p>
    <form onSubmit={submitLogin}>
    <input type='text' placeholder='ENTER EMAIL' autoComplete='off' onChange={LoginData} value={Login.email} name='email'></input>
    <input type='password' placeholder='ENTER PASSWORD' autoComplete='off' onChange={LoginData} value={Login.password} name='password'></input>
    <button type='submit'>LOGIN</button>
    <button><NavLink to="/">RETURN</NavLink></button>
    </form>
    </div>
    <div className='login-1'>
    <img src={LOGO} alt='OUR LOGO'></img>
    <h2>NEW TO DEN?</h2>
    <p>Enter the lion den to roar with us!</p>
    <form onSubmit={submitSignup}>
    <input type='text' placeholder='ENTER NAME' autoComplete='off' onChange={SignupData} value={Signup.name} name='name'></input>
    <input type='text' placeholder='ENTER EMAIL' autoComplete='off' onChange={SignupData} value={Signup.email} name='email'></input>
    <input type='password' placeholder='ENTER PASSWORD' autoComplete='off' onChange={SignupData} value={Signup.password} name='password'></input>
    <button type='submit'>SIGNUP</button>
    <button><NavLink to="/">RETURN</NavLink></button>
    </form>
    </div>
    </div>
)
}
export default Register