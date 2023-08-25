import React,{useEffect ,Fragment , useState} from 'react'
import { getProductDetails } from '../../Slice/ProductSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../StyleComponent/Loader/Loader';
import { useParams } from 'react-router-dom';
import Carousel from 'nuka-carousel';
import './ProductPage.css'
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviweCard';
import { addTocart } from '../../Slice/CartSlice';

const ProductPage = () => {


    const dispatch = useDispatch();
    const { loading , productDetails } = useSelector((state) => state.products);
    const { cartItem } = useSelector((state)=> state.cart);
    const { id } = useParams();

    //In backend AuthFetch i removed think and Attach it if  required
      //In backend AuthFetch i removed think and Attach it if  required
        //In backend AuthFetch i removed think and Attach it if  required
          //In backend AuthFetch i removed think and Attach it if  required

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
      
      if (productDetails.stock <= quantity) 
          return;

      const qty = quantity + 1;
      setQuantity(qty);
    };
  
    const decreaseQuantity = () => {
      if (1 >= quantity) return;
  
      const qty = quantity - 1;
      setQuantity(qty);
    };
  

    useEffect(()=>{
      dispatch(getProductDetails(id));
    },[dispatch,id]);

    useEffect(()=>{
      console.log(cartItem);
    },[cartItem])

    const options = {
        edit:false,
        activeColor:'#FFBF00',
        value: productDetails.ratings,
        isHalf:true,
        size: 20
      }
    
      const addToCartHandler = () => {
        dispatch(addTocart({id, quantity}));
        // alert.success("Item Added To Cart");
      };

  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        {/* <MetaData title={`${productDetails.name} -- ECOMMERCE`} /> */}
        <div className="ProductDetails">
          <div>
          <div className='container'>
                <Carousel   
                    renderCenterLeftControls={({ previousSlide }) => null}
                    renderCenterRightControls={({ nextSlide }) => null}>
                        {productDetails?.image?.map((pic , index) => {return <img key={index} src={pic.url} draggable="false" alt="" />})}
                </Carousel>
            </div>  
          </div>

          <div>
            <div className="detailsBlock-1">
              <h2>{productDetails.name}</h2>
              <p>Product # {productDetails._id}</p>
            </div>
            <div className="detailsBlock-2">
              <ReactStars {...options} />
              <span className="detailsBlock-2-span">
                ({productDetails.noOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${productDetails.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button
                  disabled={productDetails.stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>

              <p>
                Status:
                <b className={productDetails.stock < 1 ? "redColor" : "greenColor"}>
                  {productDetails.stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description : <p>{productDetails.discription}</p>
            </div>

            <button  className="submitReview">
              Submit Review
            </button>
          </div>
        </div>
        
        <h3 className="reviewsHeading">REVIEWS</h3>

        {productDetails.review && productDetails.review[0] ? (
            <div className="reviews">
              {productDetails.review &&
                productDetails.review.map((rev) => (
                  <ReviewCard key={rev._id} review={rev} />
                ))}
                {/* <ReviewCard  review={productDetails.review[0]} />
                <ReviewCard  review={productDetails.review[0]} />
                <ReviewCard  review={productDetails.review[0]} />
                <ReviewCard  review={productDetails.review[0]} /> */}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductPage



    //   { productDetails && <div className="detailCard flexUtil">
    //     <div className="leftContainer flexUtil">
    //         <div className='container'>
    //             <Carousel   
    //                 renderCenterLeftControls={({ previousSlide }) => null}
    //                 renderCenterRightControls={({ nextSlide }) => null}>
    //                     {productDetails?.image?.map((pic) => {return <img src={pic.url} draggable="false" alt="" />})}
    //             </Carousel>
    //         </div>  
    //     </div>
    //     <div className="rightContainer">
    //         <div className="dB-1">
    //             <h2>{productDetails.name}</h2>
    //             <p>Product # {productDetails._id}</p>
    //         </div>
    //         <div className="stars flexUtil">
    //             <ReactStars {...options} style={{alignSelf:'streach'}}/>
    //             <p>{productDetails.ratings}24</p>
    //             <p>({productDetails.noOfReviews}45)</p>
    //         </div>
    //         <h2>{`₹${productDetails.price}`}</h2>
    //         <p className='discription'>Discription:{productDetails.discription}</p>
    //         <div className="quantity">
    //             <span><button>+</button>5
    //             <button>-</button></span>
    //             <p>Status:InStock</p>
    //         </div>
    //         <button disabled={productDetails.Stock < 1 ? true : false} >
    //                 Add to Cart
    //         </button>
    //     </div>
    //    </div>}