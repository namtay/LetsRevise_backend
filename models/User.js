const mongoose = require("mongoose");

const User = mongoose.Schema({
    email:{
        type:"String",
        required:true,
        lowercase:true,
        unique:true   
    },
    password:{
        type:"String",
        minlength:8
    },
    confirmPassword:{
        type:"String",
        minlength:8
    }
})



module.exports=mongoose.model("User",User)