import React, { useEffect } from 'react'
import './Account.css'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogOut } from '../../Slice/UserSlice'

const Account = () => {

  const navigate = useNavigate();
  // loading
  const {user  , isAuthenticated} = useSelector((state)=> state.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/login');
    }
  },[navigate,isAuthenticated]);

  const handleLogout = () => {
    dispatch(userLogOut());
  }
  
  //problem with route of user in backend it is not clearing cookies need to work on it

  return (
    <div className='Account'>
      <button className='logout' onClick={handleLogout}><i class="fa-solid fa-right-from-bracket" style={{color: "#686a6e"}}></i>Logout</button>
      <div className="ActContainer">
        <div className="profile">
          <svg class="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path></svg>
          <i class="fa-solid fa-pen" style={{color:"#4f4f4f"}}></i>
        </div>
        <div className="detail">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          
        </div>
        <div className="Access">    
          <button className='wishlist'><i className="fa-solid fa-heart" style={{color:"#FF004F"}}></i>Wishlist</button>
          <button className='cart'><i className="fa-brands fa-opencart" style={{color:"#000000"}}></i>Cart</button>
          <button className='orders'><i class="fa-solid fa-box" style={{color: "#727274"}}></i>Orders</button>
        </div>
        {/* <div className="Access">
          <button className='ordersList'><i class="fa-solid fa-box" style={{color:" #727274"}}></i>Orders</button>
          <button className='usersList'><i class="fa-solid fa-users-line" style={{color:" #666666"}}></i>Users</button>
          <button className='productsList'><i class="fa-solid fa-shop" style={{color:" #5c5c5c"}}></i>Orders</button>
          <button className='reviewsList'><i class="fa-solid fa-certificate" style={{color:" #545454"}}></i>Reviews</button>
        </div> */}
      </div>
    </div>
  )
}

export default Account