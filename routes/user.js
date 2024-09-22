const {Router} = require('express');
const express = require('express');

const userRouter = Router();

const {userModel} = require('../db');

const app = express();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// app.use(express.json());

userRouter.post('/signup',  async function(req,res){
     const {userEmail , userPassword, userName} = req.body; 
     try{
        const userHashedPassword = await bcrypt.hash(userPassword,saltRounds)
       await userModel.create({
            email : userEmail,
            password: userHashedPassword,
            name: userName
          })

          res.status(201).send('User created succesfully');
     }
     catch(e){
         res.status(500).send('Error signin up user');
     }
})

userRouter.post('/signin', async function(req,res){
          const {userEmail,userPassword} = req.body;
          try{
            const user =  await userModel.findOne({email:userEmail});

            if(!user){
              return res.status(500).send("user not found");
            }

            const response = await bcrypt.compare(userPassword, user.password)

            if(!response){
                return res.status(500).send("Incorrect Password")
            }
            const token = jwt.sign({userId: user.userId},'neverDiealwayslive');

            res.status(200).json({token});
          

            }

            catch(e){
              console.log(e);
              res.status(500).send("Error signing in user")
          }

})

userRouter.get('/purchases', function(req,res){
       res.json({
          messange: "Aukaad h teri"
       })

})

module.exports = {
    userRouter: userRouter
}