const jwt = require("jsonwebtoken");
const user = require("../Models/UserSchema");

const authenticate =async(req,res,next)=>{
    try {

        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await user.findOne({ _id: verifyToken._id, "tokens.token": token });  

        if (!rootUser) {
            throw new Error("User not found");
        }  
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        
        next(); 
    } catch (error) {
        res.status(401).send("Unauthorized: No token provided");
    }
}

module.exports = authenticate;