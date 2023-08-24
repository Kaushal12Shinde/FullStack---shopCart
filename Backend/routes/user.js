const express = require('express');
const User = require('../Model/User')
const router = express.Router();
const sendToken = require('../Utility/sendToken');
const authFetch = require('../Middleware/authFetch');
const ApiFeatures = require('../Utility/ApiFeatures');
const checkAdmin = require('../Middleware/checkAdmin');
const catchAsyncErrors = require('../Middleware/catchAsyncErrors');


//ErrorHandling Remaining ---- for other functions try catch block or asyncCathc/ check once asyncatch works or not

//1-> 
    
    router.post('/register', async(req,res,next)=>{
        try{
            const user = await User.create(req.body);
            sendToken(user,201,res);
        }catch{
            return res.status(400).json({message:'User Allready Exist try to Login'});
        }
    });

//2->

    router.post('/login', catchAsyncErrors(async(req,res,next)=>{
            const {email,password} = req.body;

            const user = await User.findOne({email}).select('+password');
            
            if(!user)
                return res.status(400).json({message:'user Not Found'});
            
            const hash = await user.compareHash(password);
            
            if(!hash)
                return res.status(500).json({message:"Invalid User Details"});
            
            sendToken(user,200,res);
    }));

//3->

    router.post('/logout',async(req,res)=>{

        res.cookie('token',null,{
            expires:new Date(Date.now()),
            httpOnly:true
        });
        
        res.status(200).json({message:"Logged Out"})
    })

//4->

    router.put('/editMyDetails', authFetch ,async(req,res)=>{

        const user = await User.findByIdAndUpdate(req.userId,req.body,{
            new:true
        });
        
        res.status(200).json({
            success:true,
            user
        })
    })

//5-> 

    router.get('/myDetails', authFetch , async(req,res)=>{

        const user = await User.findById(req.userId);
        res.status(200).json({
            success:true,
            user
        })

    })

//6->(admin)function

    router.get('/searchUsers', authFetch , checkAdmin , async(req,res)=>{
        
        const executeList = new ApiFeatures(User.find(), req.query).search();
        const userList = await executeList.query;
        res.status(200).json({
            success:true,
            userList,
            totalUsers : userList?.length || 0
        });

    });

//7->(admin)function

    router.get('/userDetails/:id', authFetch , checkAdmin , async(req,res)=>{
        
        const user = await User.findById(req.params.id);
        
        if(!user){
            return res.status(400).json({
                message:'User not found'
            })
        }

        res.status(200).json({
            success : true, 
            user
        })
        
    });

//8 ->(admin)Function 

    router.put('/updateUserDetails/:id', authFetch , checkAdmin , async(req,res)=>{

        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        });

        res.status(200).json({
            success:true,
            user
        })

    })

//9 -> watchlist

    router.put('/add-wishlist/:id', authFetch , async(req,res)=>{

        const user = await User.findById(req.userId);

        user.wishlist.push(req.params.id);

        await user.save({validateBeforeSave:false});

        res.status(200).json({
            success:true,
            message:'Added'
        })

    });

    router.delete('/delete-wishlist/:id',authFetch , async(req,res)=>{

        const user = await User.findById(req.userId);
        console.log('id to be deleted',req.params.id);
        
        const wishlist = user.wishlist.filter((pro)=> {
            return pro._id.toString() !== req.params.id.toString()
        });

        await User.findByIdAndUpdate(req.userId,{
            wishlist }
            ,{
                new:true, //return modified data
                runValidators: true,
                useFindAndModify:false // it uses the method of findOneAndModify
            }
        )
        
        res.status(200).json({
            success : true,
            message:"Removed",
        })
    })


module.exports = router
