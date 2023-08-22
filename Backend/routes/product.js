const express = require('express');
const Product = require('../Model/Product');
const ApiFeatures = require('../Utility/ApiFeatures');
const authFetch = require('../Middleware/authFetch');
const checkAdmin = require('../Middleware/checkAdmin');
const catchAsyncErrors = require('../Middleware/catchAsyncErrors');
const ErrorHandler = require('../Utility/ErrorHandler');
const router = express.Router();



// 1 -> Endpoint getting Products

    router.get('/getAllProducts', catchAsyncErrors(async(req,res)=>{
        const resultPerPage = 8;
        const ProductCount = await Product.countDocuments();
        const apiFeature = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage); //pending promise chaining 
    
        let AllProduct = await apiFeature.query;
            res.status(200).json({
                success:true,
                AllProduct,
                ProductCount
            })
    }));

// 2 -> Endpoint Adding New Product <- (Admin)

    router.post('/newProduct', authFetch , checkAdmin , catchAsyncErrors( async (req,res)=>{

        const pro = {...req.body, createdBy: req.userId}
        // console.log(pro)
        await Product.create(pro);
        res.status(200).json({
            success:true,
            pro
        })

    }));

// 3 -> Enpoint Updating Any Product <- (Admin)    

    router.put('/editProduct/:id', authFetch , checkAdmin , catchAsyncErrors( async(req , res)=>{
        
        let product = await Product.findById(req.params.id);

        // console.log(product)
        // if (!product) {
        //     return next(new ErrorHandler("Product not found", 404));
        //   }
        if(!product){
            return res.status(500).json({
                success:false,
                message:'No such a Product Found!'
            })
        }

        const pro = {...req.body , createdBy: req.userId}
        console.log(pro)
        let updatedProduct = await Product.findByIdAndUpdate(req.params.id , pro ,{
            new : true,
            runValidators:true,
            useFindAndModify:false
        });

        res.status(200).json({
            success:true,
            updatedProduct
        });
    
    }));

// 4 -> Endpoint Delete Any Product <- (Admin)

    router.delete('/delete/:id' , authFetch , checkAdmin , catchAsyncErrors(async(req , res)=>{
        let product = await Product.findById(req.params.id);
        if(!product)
            return res.status(500).json({
                success:false,
                message:'No such a Product Found!'  
            })
        
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:'Product Deleted'  
        })
    }));

// 5 -> Endpoint For Add Reviews , Ratings and NoOf Reviews
    
//u can keep it from params/ body/ query..product id is mandatory

    router.post('/postReview/:id', authFetch ,catchAsyncErrors(async (req, res)=>{ //working
        
        const {rating , comment} = req.body;

        let tempReview = {
            user:req.userId,
            name:req.userName,
            rating: Number(rating),
            comment:comment,
        }

        let product = await Product.findById(req.params.id);

        let isReviewed = false;
        product.review.forEach((rev)=>{
            if(rev.user.toString()===req.userId.toString()){
                isReviewed=true;
                return;
            }
        })

        if(isReviewed){
            product.review.forEach((rev)=>{
                if(rev.user.toString()===req.userId.toString()){
                    rev.rating = Number(rating); 
                    rev.comment = comment;
                }
            })
        }
        else{
            product.review.push(tempReview);
            product.noOfReviews= product.review.length;
        }

        //CHECK oNCE PRODUCT.RATING SHOULD BE 0 IF NO REVIEWS
        let totalRating = 0;
        product.review.forEach((rev)=>{
            totalRating+=rev.rating;
        })
        let avgRating = totalRating/product.noOfReviews;

        product.ratings = avgRating;

        await product.save({validateBeforeSave:false});

        res.status(200).json({success:true,
            message:'Review added'})
    }));

//6-> Product All Reviews on Page

    router.get('/getAllReviewsOfProduct/:id', catchAsyncErrors(async(req,res)=>{
        
        let product = await Product.findById(req.params.id);
        if(!product)
            return res.status(400).json({message:'Product Not Found'});

        res.status(200).json({
            success:true,
            reviews : product.review
        });

    }));

//7-> Delete Any Review on Page

    router.delete('/deleteReview', authFetch , checkAdmin , catchAsyncErrors(async(req,res)=>{

        let product = await Product.findById(req.query.productId);
        if(!product)
            return res.status(400).json({message:'Product Not Found'});

        const review = product.review.filter((rev) => rev._id.toString() !== req.query.reviewId);

        const noOfReviews = review.length;

        let ratings = 0;
        if(review.length!==0) {

            let totalRating = 0;
            
            review.forEach((rev)=>{
                totalRating+=rev.rating;
            })

            ratings = totalRating/noOfReviews;
        }

        await Product.findByIdAndUpdate(req.query.productId ,{
            review,
            noOfReviews,
            ratings
        },{
            new:true, //return modified data
            runValidators: true,
            useFindAndModify:false // it uses the method of findOneAndModify
        })

        res.status(200).json({success:true})    
    }));

//8 -> getProductDetails -> include authFetch
    router.get('/:id', catchAsyncErrors( async (req,res)=>{

        let product = await Product.findById(req.params.id);
        if(!product)
            return res.status(400).json({message:'Product Not Found'});

        res.status(200).json({
            success:true,
            product: product
        });

    }));

module.exports = router