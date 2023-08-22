import ReactStars from 'react-rating-stars-component';
import React from "react";

const ReviewCard = ({ review }) => {
  const options = {
    edit:false,
    activeColor:'#FFBF00',
    value: review.rating,
    isHalf:true,
    size: 20
  }

  return (
    <div className="reviewCard">
      <i className="fa-regular fa-user" style={{color:"#000000"}}></i>
      {/* <img src={profilePng} alt="User" /> */}
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;