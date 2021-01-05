const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    titleId:{
        type:"String"
    },
    questionNumber:{
        type:"number"
    },
    question:{
        type:"String",
        required: true
    },

    correct_answer:{
        type:"String",
        required:true
    }
})


module.exports=mongoose.model("Question",questionSchema)