import React, { useEffect, useState ,useRef } from 'react'
import './LoginSignup.css'
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, userLogin , userRegister } from '../../Slice/UserSlice';
import { useNavigate } from 'react-router-dom';

const Login_Signup = () => {

  const [loginToggle, setLoginToggle] = useState(true);
  const [credential,setCredential] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const {user , loading ,error ,isAuthenticated} = useSelector((state) => state.user);

  useEffect(()=>{
    setCredential({});
    if (formRef.current) {
      formRef.current.reset();  // Reset the form when loginToggle changes
    }
  },[loginToggle])

  

  const handleChange=(e)=>{
    setCredential({...credential,[e.target.name]:e.target.value});
  }

  const handleLogin=(e)=>{
    e.preventDefault();
    if(loginToggle){
      dispatch(userLogin(credential));
    }
    else{
      dispatch(userRegister(credential));
    }
  }

  //Handle navigation to accounts page or prev page where you were brought for login here..

 
  useEffect(()=>{
    if(error){
      alert(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(`/account`);
    }
  },[dispatch,error,isAuthenticated]);

  return (
    <div className='LoginSignup' >
      {!loading && <div className="Form">
        <div className="toggle">
          <h3 className={loginToggle ? 'active login' : 'login'}  onClick={()=>{setLoginToggle(true)}}>LOGIN</h3>
          <h3 className={loginToggle ? 'register' : 'active register'} onClick={()=>{setLoginToggle(false)}}>REGISTER</h3>
        </div>
        <form ref={formRef} onSubmit={handleLogin}>
          {!loginToggle && <input type="text" name="name"  placeholder='Username' onChange={handleChange} required/>}
          <input type="text" name="email"  placeholder='Enter Email' onChange={handleChange} required/>
          <input type="password" name="password"  placeholder='Enter Password' onChange={handleChange} required/>
          {loginToggle && <button type='submit'>Login</button>}
          {!loginToggle && <button type='submit'>Register</button>}
        </form>
      </div>
      }
    </div>
  )
}

export default Login_Signup
