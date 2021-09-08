const moogose = require('mongoose');

const postschema = new moogose.Schema({
    email:{
        type:String,
        required:true
    },
    title:{
        type: String,
        trim: true,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
})

const post = new moogose.model('post',postschema);

module.exports = post