import React from 'react'
import './Product.css'
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const Product = ({product}) => {

  const options = {
    edit:false,
    activeColor:'#FFBF00',
    value:product.ratings,
    isHalf:true,
    size: 16
  }

  return (
    <Link className='Product' to={`/product/${product._id}`}>
        <div  className="imgCont">
            <img src={product.image[0].url} alt="" />
        </div>
        
        <div className="details">
            <p>{product.category}</p>
            <h3>{product.name.length > 30 ? product.name.slice(0, 30) + '...' : product.name}</h3>
            <div className="stars flexUtil">
                <ReactStars {...options} style={{alignSelf:'streach'}}/>
                <p>{product.ratings}</p>
                <p>({product.noOfReviews})</p>
            </div>
            <h3>${product.price}</h3>
        </div>
        
    </Link>
  )
}

export default Product
