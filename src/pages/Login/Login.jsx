import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import assets from '../../assets/assets';
import { signup, login, resetPass } from '../../config/firebase';
const Login = () => {
  const [currState, setCurrentState] = useState("Sign up");
  const [username, setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if(currState === "Sign up"){
      signup(username,email,password);
    }
    else{
      login(email,password)
    }
  }

  return (
    <div className='login'>
      <video autoPlay muted loop className="background-video">
        <source src="/background_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <img src={assets.logo_big} alt="Logo" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign up" ? <input onChange={(e)=>setUserName(e.target.value)} value = {username} type="text" placeholder='Username' className="form-input" required /> : null}
        <input onChange={(e)=>setEmail(e.target.value)} value = {email} type="email" placeholder='Email address' className="form-input" required />
        <input onChange={(e)=>setPassword(e.target.value)} value = {password} type="password" placeholder='Password' className="form-input" required />
        <button type='submit'>{currState === "Sign up" ? "Create account" : "Login now"}</button>
        <div className="login-term">
          <input type="checkbox" required />
          <p>Agree to the <Link to="/terms" className="footer-link">Terms of Use</Link> & <Link to="/privacy" className="footer-link">Privacy Policy</Link>.</p>
        </div>
        <div className="login-forgot">
          {currState === "Sign up"
            ? <p className="login-toggle">Already have an account <span onClick={() => setCurrentState("Login")}>Login here</span></p>
            : <p className="login-toggle">Create an account <span onClick={() => setCurrentState("Sign up")}>click here</span></p>
          }
          {currState === "Login" ? <p className="login-toggle">Forgot Password ? <span onClick={() => resetPass(email)}>reset here</span></p>:null }
        </div>
      </form>
      
    </div>
  );
}

export default Login;
