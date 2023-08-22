const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name: {
        type:String,
        required:[true,'Please add a product Name'],
        trim:true
    },
    
    discription:{
        type : String ,
        required:[true,'Please add a product Discription']
    },
    
    price:{
        type:Number,
        required:[true,'Please add a product Price'],
        maxLength:[8,'Price Cannot Exceed 8 Characters']
    },
    
    ratings:{
        type: Number,
        default:0
    },
    
    image:[
        {
            public_id:{
                type:String,
                required:[true]
            },
            url:{
                type:String,
                required:[true],
            }
        }
    ],
    
    category:{
        type:String,
        required:[true, 'Please add a product Category']
    },
    
    stock:{
        type:Number,
        required:[true,'Please add a No Of stock Of Product'],
        maxLength:[4,'Stock Can not Exceed 4 Characters'],
        default:1
    },
    
    noOfReviews:{
        type:Number,
        default:0
    },
    
    review:[
        {
            user:{
                type : mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            name:{
                type:String,
                required:[true]
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    createdAt:{
        type : Date,
        default:Date.now(),
    }
    
});
module.exports = mongoose.model('Product', ProductSchema);