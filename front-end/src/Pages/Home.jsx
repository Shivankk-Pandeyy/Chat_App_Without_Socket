import { NavLink } from 'react-router-dom';
import './Home.css';
import HOME from './HOME.gif';
import LOGO from './LOGO.png';
const Home = () => {
return (
    <div className='home'>
    <div className='home-1'>
    <img src={HOME} alt='HOME PIC'></img>
    </div>
    <div className='home-2'>
    <div className='home-logo'>
    <img src={LOGO} alt='OUR LOGO'></img>
    </div>
    <div className='home-info'>
    <h2>LION ROARS</h2>
    <p>Welcome to LION ROARS, where your voice echoes through the jungle! Connect, share, and engage with a community that values every roar. Dive into vibrant discussions and make new friends who share your passions. Join us and let your voice be heard!</p>
    </div>
    <div className='home-buttonn'>
    <button><NavLink to="/Register">START TODAY</NavLink></button>
    </div>
    <h2></h2>
    </div>
    </div>
)
}
export default Home