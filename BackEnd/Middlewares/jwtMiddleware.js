const jwt = require('jsonwebtoken');
const jwtMiddleware = (req,res,next)=>{
    console.log("Inside the router middleware");
    // token verify 
    // 1.get Token from request header
    const token = req.headers['authorization'].slice(7)
    console.log(token);
    try{
       // verify token
        const tokenVerification = jwt.verify(token,"SectretPFair")
        console.log(tokenVerification);
        req.payload = tokenVerification.userId
        // res.send(200).
        next();
    }catch(err){
        res.status(401).json("Authorization failed.. Please login again.")
    }

    // next();
}

module.exports = jwtMiddleware