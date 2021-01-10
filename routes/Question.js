var express = require('express');
var questionRouter = express.Router();
const { isValidObjectId } = require('mongoose');
const ObjectID = require("mongodb").ObjectID;
const Question = require("../models/Question");


/*get all question with a particular questionId*/
questionRouter.get("/:id",function(req,res,next){
    const id =req.params.id;    
    Question.find({titleId:id},(err,questions)=>{
        if(err){
          return res.send({message:err});
        }else{
          return  res.json({message:"successfully connected",questions});
        }
    }
)
})

/*add question to a particular question id*/
questionRouter.post("/create/:id", async function(req,res,next){
    const id =req.params.id;  
        const questionCount = await Question.countDocuments({titleId:id});
        const newQuestionCount= questionCount + 1    
        const newQuestion =  new Question({
            titleId:id,
            questionNumber:newQuestionCount,
            question:req.body.question,
            correct_answer:req.body.correct_answer,     
           
        })
    newQuestion
    .save()
    .then((res)=>{
        
        console.log(res)     
    })
    .catch((err)=>{
        res.status(500).send(err.message);

    })
    
})


/*get one question by id*/
questionRouter.get("/one/:id",async function(req,res,next){
    const id = new ObjectID(req.params.id);   
    const question = await Question.findById(id).exec()        
    res.status(200).json(question)
})

/*edit question*/
questionRouter.post("/edit/:id",function(req,res,next){
    const id =req.params.id;
    Question.findById({_id:id},(err,findQuestion)=>{
        if(!findQuestion){
            res.status(404).send("Question not found")

        }else{
            findQuestion.question= req.body.question;
            findQuestion.correct_answer= req.body.correct_answer;
            findQuestion.save().then(findQuestion=>{
                res.json(findQuestion)
            }).catch(err =>res.status(500).send(err.message))
        }
        }
    )
})

/*delete question */
questionRouter.delete("/delete/:id",function(req,res,next){
    const id =req.params.id;
       Question.findByIdAndDelete({_id:id}, function (err, deletedQuestion) { 
        if (err){ 
            console.log(err) 
        } 
        else{
            res.json({"deleted":deletedQuestion}) 
            console.log("Deleted : ", deletedQuestion); 
        } 
    })         

})

module.exports = questionRouter;
