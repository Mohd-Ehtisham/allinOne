const user = require("../Models/UserSchema")

const adminPage = async (req,res,next) =>{
        const rootUser = await user.findOne({ role : 1});  
        if(rootUser){
            req.rootUser = rootUser;
            // console.log(rootUser);
            next();
        }else{
            throw new Error("User not found");
        }
}

module.exports = adminPage;