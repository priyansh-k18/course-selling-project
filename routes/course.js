const {Router} = require('express');
const courseRouter = Router();

const {courseModel} = require('../db');

courseRouter.get('/preview', function(req,res){


})

courseRouter.post('/purchase', function(req,res){


})

module.exports = {
    courseRouter:courseRouter
}