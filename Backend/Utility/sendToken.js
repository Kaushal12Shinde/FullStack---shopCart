const sendToken = async function(user,code,res){
    const token = user.getJWT();

    const options = {
        // env.local 7days
        expiresIn: new Date( Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly:true
    }

    res.status(code).cookie("token",token,options).json({
        success:true,
        user,
        token
    });
}

module.exports = sendToken;