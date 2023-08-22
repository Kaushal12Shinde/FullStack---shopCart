const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const authFetch = async (req , res , next)=>{
    const { token } = req.cookies;
    // console.log(token);
    if(!token){
        return  res.status(401).send({msg:'access Denied from'});
    }
    const decodeData = jwt.verify(token, 'kaushal');
    // console.log(decodeData);
    req.userId = decodeData.id;
    const user = await User.findById(req.userId);
    req.userName = user.name;
    next();
}

module.exports = authFetch;