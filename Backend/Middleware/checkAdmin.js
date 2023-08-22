const User = require("../Model/User")

const checkAdmin = async( req , res, next )=>{
    const user = await User.findById(req.userId);
    if(!user){
        return  res.status(401).json({ message:'User Not Found'});
    }
    //check admin role
    if(user.role!=='admin')
        return res.status(401).json({message:'User Is Not Allowed'});
    console.log('Access Granted');
    next();
}

module.exports = checkAdmin;