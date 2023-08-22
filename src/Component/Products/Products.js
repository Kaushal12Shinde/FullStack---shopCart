import React, { useState ,useEffect } from 'react'
import './Products.css'
import ProductCard from '../ProductCard/ProductCard'
import { getProducts } from '../../Slice/ProductSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhone",
];


const Products = () => {

  const [category, setCategory] = useState("");
  
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { loading, error, products , productCount } = useSelector((state) => state.products);

  useEffect(()=>{
    dispatch(getProducts({keyword , category}));
  },[dispatch,keyword,category]);

  // console.log(products , productCount);
  return (
    <div className='Products'>

        <div className="features">
          <select onChange={(e)=>{setCategory(e.target.value)}}>
            <option selected disabled hidden>
              Select Category
            </option>
            <option value="">All</option>
            {categories.map((cat)=> <option value={cat}>{cat}</option>)}
          </select>
            {/* <button>Price Range</button>
            <button>Categories</button>
            <button>Ratings</button>
            <button>Low To High</button> */}
        </div>
        <div className="displayProduct">
        {
          loading ? (<Loader/>) :
          products && products.map((product => <ProductCard product={product} key={product._id}/>)) 
        } 
        </div>
    </div>
  )
}

export default Products
