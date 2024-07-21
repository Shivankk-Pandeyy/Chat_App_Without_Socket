import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import HomePage from "./Chatting/HomePage";
import UserChats from "./Chatting/UserChats";
import User from "./Chatting/User";
import Chat from "./Chatting/Chat";
const App = () => {
  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/Welcome/:id" element={<HomePage/>}/>
    <Route path="/MyChats/:id" element={<UserChats/>}/>
    <Route path="/MyProfile/:id" element={<User/>}/>
    <Route path="/OpenChat/:id" element={<Chat/>}/>
    </Routes>
  )
}
export default App