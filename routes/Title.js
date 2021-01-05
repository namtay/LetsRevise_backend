var express = require('express');
var titleRouter = express.Router();
const { isValidObjectId } = require('mongoose');
const ObjectID = require("mongodb").ObjectID;
const Title = require("../models/Title");


/* post title */
titleRouter.post('/create', function(req, res, next) {
    const title = new Title(req.body);
    title
    .save()
    .then((res)=>{
        //res.send("successfully connected")
        console.log(res) 
    
    })
    .catch((err)=>{
        res.status(500).send(err.message);

    })
});

/* get title */
titleRouter.get("/",function(req,res,next){
    Title.find((err,titles)=>{
        if(err){
          return res.send({message:err});
        }else{
          return  res.json({message:"successfully connected",titles});
        }
    }
)

})

/*get title by id */
titleRouter.get("/:id",async function(req,res,next){
    const id = new ObjectID(req.params.id);   
    const title = await Title.findById(id).exec()        
    res.status(200).json(title)
})


titleRouter.post("/edit/:id",function(req,res,next){
    const id =req.params.id;
    Title.findById({_id:id},(err,findTitle)=>{
        if(!findTitle){
            res.status(404).send("Title not found")

        }else{
            findTitle.title= req.body.title;
            findTitle.save().then(findTitle=>{
                res.json(findTitle)
            }).catch(err =>res.status(500).send(err.message))
        }
        }
    )
})


titleRouter.delete("/delete/:id",function(req,res,next){
    const id =req.params.id;
     Title.findByIdAndDelete({_id:id}, function (err, deletedTitle) { 
        if (err){ 
            console.log(err) 
        } 
        else{
            res.json({"deleted":deletedTitle}) 
            console.log("Deleted : ", deletedTitle); 
        } 
    })         

})
module.exports = titleRouter;
