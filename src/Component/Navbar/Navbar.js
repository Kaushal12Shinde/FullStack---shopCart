import './Navbar.css';
import {Link , useLocation , useNavigate} from 'react-router-dom';

import React ,{useState ,useEffect} from 'react'


const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [timerId,setTimerId] = useState();
  const [helper,setHelper] = useState(false);

// <----- Debouncing ----->


//handle problem of search

  const handleSearch = (e) =>{
      e.preventDefault();
      setKeyword(e.target.value);
      
      if (timerId) {
          clearTimeout(timerId);
      }
  
      setTimerId(setTimeout(() => {
          setHelper(!helper);
      }, 1000));

  }

  useEffect(()=>{
    if(keyword.trim())
      navigate(`/products/${keyword}`)
  },[helper,keyword,navigate])  

  const displaySearch = location.pathname.startsWith('/products' || '/products/');

  return (
    <div className='Navbar flexUtil'>
        <div className="anchorSec">
            <Link to="/login">Home</Link>
            <Link to="/products">Products</Link>
            <a href="/about">About</a>
        </div>
        <div className="funSec flexUtil">
          { displaySearch && 
            <div className="searchBox">
              <input type="text" placeholder='Search Product..' onChange={handleSearch}/>
              <i className="fa-solid fa-magnifying-glass" style={{color:"#8C92AC"}} ></i>
            </div>
          }
            
            <Link to={`/account`}><i className="fa-regular fa-user" style={{color:"#000000"}}></i></Link>
            <i className="fa-solid fa-heart" style={{color:"#FF004F"}}></i>
            <Link to={`/cart`}><i className="fa-brands fa-opencart" style={{color:"#000000"}}></i></Link>
        </div>
    </div>
  )
}

export default Navbar ;
//Add Number of product Notify on cart