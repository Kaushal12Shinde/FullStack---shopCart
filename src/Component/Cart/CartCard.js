import React from 'react'

const CartCard = ({ item , handleRemove }) => {
  return (
    <div className='cartCard'>
        <img src={item.image} alt='ShopCart'></img>
        <h5>{item.name.length > 30 ? item.name.slice(0, 30) + '...' : item.name}</h5>
        <h5>₹{item.price} </h5>
        <h5>Qty:{item.quantity} </h5>
        <button className='remove-btn' onClick={()=>handleRemove(item.product)}>Remove Item</button>
    </div>
  )
}

export default CartCard
