const moongose = require("mongoose");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new moongose.Schema({
    role:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


UserSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password=await bycrpt.hash(this.password,12);
    }
    next();
});

UserSchema.methods.generateAuthToken = async function (){    
    try{
        let token=jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err); 
    }
}

const user = new moongose.model('user',UserSchema);

module.exports = user;