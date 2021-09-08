const moongose = require('mongoose');

const AdminSchema = new moongose.Schema({
    role:{
        type:Number,
        default:0
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

const Admin = new moongose.model('Admin',AdminSchema);

module.exports=Admin;