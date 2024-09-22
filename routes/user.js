const {Router} = require('express');
const userRouter = Router();

const {userModel} = require('../db');


userRouter.post('/signup', function(req,res){

})

userRouter.post('/signin', function(req,res){


})

userRouter.get('/purchases', function(req,res){
       res.json({
          messange: "Aukaad h teri"
       })

})

module.exports = {
    userRouter: userRouter
}