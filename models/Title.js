const mongoose = require("mongoose");

const Title = mongoose.Schema({
    title:{
        type:"String"
    }
})


module.exports=mongoose.model("Title",Title)