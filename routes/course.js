const { Router } = require('express');
const courseRouter = Router();
const auth = require('../middleware/user');
const { courseModel, purchaseModel } = require('../db');

courseRouter.get('/preview', async function (req, res) {
    const courses = await courseModel.find({});
    res.json({ courses });
});

courseRouter.post('/purchase', auth, async function (req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    });

    res.json({
        message: "You have successfully bought the course"
    });
});

module.exports = { courseRouter };
