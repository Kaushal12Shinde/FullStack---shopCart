import React, { useEffect, useState } from 'react'
import './LoginSignup.css'
import { useSelector, useDispatch } from 'react-redux';

const Login_Signup = () => {

  const [loginToggle, setLoginToggle] = useState(true);
  const [credential,setCredential] = useState({});
  const dispatch = useDispatch();

  useEffect(()=>{
    if(loginToggle){
      document.querySelector('.login').classList.add('active');
      document.querySelector('.register').classList.remove('active');
    }
    else{
      document.querySelector('.register').classList.add('active');
      document.querySelector('.login').classList.remove('active');
    }
    setCredential({});
    const Form = document.querySelector('.Form');
    Form.querySelectorAll('input').forEach((li)=> {li.value=''});
  },[loginToggle])

  

  const handleChange=(e)=>{
    setCredential({...credential,[e.target.name]:e.target.value});
  }

  const handleLogin=(e)=>{
    e.preventDefault();
    if(loginToggle){
      // dispatch()
    }
    else{
      // dispatch()
    }
  }

  return (
    <div className='LoginSignup' >
      <div className="Form">
        <div className="toggle">
          <h3 className='active login' onClick={()=>{setLoginToggle(true)}}>LOGIN</h3>
          <h3 className='register' onClick={()=>{setLoginToggle(false)}}>REGISTER</h3>
        </div>
        <form onSubmit={handleLogin}>
          {!loginToggle && <input type="text" name="name"  placeholder='Username' onChange={handleChange} required/>}
          <input type="text" name="email"  placeholder='Enter Email' onChange={handleChange} required/>
          <input type="password" name="password"  placeholder='Enter Password' onChange={handleChange} required/>
          {loginToggle && <button type='submit'>Login</button>}
          {!loginToggle && <button type='submit'>Register</button>}
        </form>
      </div>
    </div>
  )
}

export default Login_Signup
