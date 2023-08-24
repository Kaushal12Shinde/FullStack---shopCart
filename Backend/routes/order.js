const express = require('express');
const router = express.Router();
const Product = require('../Model/Product');
const User = require('../Model/User');
const Order = require('../Model/Order');
const authFetch = require('../Middleware/authFetch');
const checkAdmin = require('../Middleware/checkAdmin');
const catchAsyncErrors = require('../Middleware/catchAsyncErrors');
const ErrorHandler = require('../Utility/ErrorHandler');


// 1 --> New Order Request from user -- checked

    router.post('/newOrder', authFetch ,async(req,res)=>{

        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          } = req.body;
        
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.userId,
        });
        
          res.status(201).json({
            success: true,
            order,
          });
        
    });

// 2 --> Get All orders of User -- Checked
    
    router.get('/myOrders' , authFetch , catchAsyncErrors( async(req, res, next) => {

        const orders = await Order.find({ user: req.userId });
    
        res.status(200).json({
            success: true,
            orders,
        });
    
    }));

// 3 --> Get Particular Order details both admin and user --checked

    router.get('/details/:id', catchAsyncErrors(async (req, res, next) => {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
    
        if (!order) {
            return next(new ErrorHandler("Order not found with this Id", 404));
        }
    
        res.status(200).json({
            success: true,
            order,
        });

    }));

// 4 --> Get All Orders -- Admin -- checked

    router.get('/all', authFetch , checkAdmin , async(req , res, next)=>{

        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        });

        res.status(200).json({
            success: true,
            totalAmount,
            orders,
        });

    })

// 5 --> Update Order Status -- Admin -- unchecked

    router.put('/updateOrder/:id',authFetch , checkAdmin , async (req, res, next) => {

        const order = await Order.findById(req.params.id);
    
        if (!order) {
            return next(new ErrorHandler("Order not found with this Id", 404));
        }
    
        if (order.orderStatus === "Delivered") {
            return next(new ErrorHandler("You have already delivered this order", 400));
        }
    
        if (req.body.status === "Shipped") {
            order.orderItems.forEach(async (ord) => {
                await updateStock(ord.product, ord.quantity);
            });
        }

        order.orderStatus = req.body.status;
    
        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
        }
    
        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
        });

    });

    //---> function for updating Stock Value()

        async function updateStock(idOfProduct, quantity) {

            const product = await Product.findById(idOfProduct);
            product.stock -= quantity;
            await product.save({ validateBeforeSave: false });
        }

// 6 --> Delete Order --Admin - unchecked
    
    router.delete('/deleteOrder/:id', authFetch , checkAdmin , async (req, res, next) => {
        
        const order = await Order.findById(req.params.id);
    
        if (!order) {
            return next(new ErrorHandler("Order not found with this Id", 404));
        }
    
        await order.remove();
    
        res.status(200).json({
            success: true,
        });

    });
  

module.exports = router