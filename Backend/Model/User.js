const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required:[true,'Please enter your Name'],
        minLength: [3 , 'Name should be at least 3 characters long'],
        maxLength: [30 , 'Name is Exceeding 30 Characters']
    },
    email:{
        type:String,
        required:[true , 'Please Enter your Email'],
        unique: true,
        validate: [validator.isEmail,'Please Enter Valid Email'],
    },
    password:{
        type:String,
        required:[true ,'Password Required!'],
        minLength:[6 , 'Password Should be of atleast 6 Characters'],
        select:false
    },
    role:{
        type:String,
        default:'user',
    },
    avatar:{
        public_id:{
            type:String,
            // required:[true]
        },
        url:{
            type:String,
            // required:[true],
        }
    },

    resetPasswordToken:String,
    resetPasswordExpire: Date
});

UserSchema.pre('save',async function(next){

    if(!this.isModified('password'))
        next();
    this.password = await bcrypt.hash(this.password,10);

});

UserSchema.methods.getJWT = function(){
    //env.var for key and time - 5d
    return jwt.sign({id:this._id},'kaushal');
}

UserSchema.methods.compareHash = async function(passwordReq){
    return await bcrypt.compareSync(passwordReq,this.password);
}

module.exports = mongoose.model('User',UserSchema)