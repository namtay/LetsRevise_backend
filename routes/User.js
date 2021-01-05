var express = require("express");
var userRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

let BCRYPT_SALT_ROUNDS = 10;
/* get users */
userRouter.get("/", (request, response, next) => {
  User.find({}).then((result) => {
    response.status(200).send(result);
    next();
  });
});

/*add user-signUp */
userRouter.post("/signup", async (request, response, next) => {
  const { email, password, confirmPassword } = request.body;
  if (email && password && confirmPassword) {
    if (password === confirmPassword) {
      bcrypt
        .hash(password, BCRYPT_SALT_ROUNDS)
        .then(function (hashedPassword) {
          const newUser = new User({
           
            email: email,
            password: hashedPassword,
            confirmPassword:hashedPassword
          });
          newUser.save();
          console.log(newUser);
        })
        .then(function () {
          response.status(201).send("Saved successfully");
        })
        .catch(function (error) {
          console.log("Error saving user: ");
          console.log(error);
          response.sendStatus(501);
          next();
        });
    }
  }
});


userRouter.post('/login',async(request,response)=>{
      
  try {
     const user = await User.findOne({ email: request.body.email });
     console.log(user);
     if (user) {
       const cmp = await bcrypt.compare(request.body.password, user.password);
       if (cmp) {
         
         response.send("Authentication Successful");
       } else {
         response.send("Wrong username or password.");
       }
     } else {
         response.send("Wrong username or password.");
     }
   } catch (error) {
     console.log(error);
     response.status(500).send("Internal Server error Occured");
   }
 })

module.exports = userRouter;
