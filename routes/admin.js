const { Router } = require('express');
const adminRouter = Router();
const { adminModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');
const bcrypt = require('bcrypt');
const auth = require('../middleware/admin');
const saltRounds = 10;

adminRouter.post('/signup', async function (req, res) {
    const { adminEmail, adminPassword, adminName } = req.body;
    try {
        const adminHashedPassword = await bcrypt.hash(adminPassword, saltRounds);
        await adminModel.create({
            email: adminEmail,
            password: adminHashedPassword,
            name: adminName
        });

        res.status(201).send('admin created successfully');
    } catch (e) {
        res.status(500).send('Error signing up admin');
    }
});

adminRouter.post('/signin', async function (req, res) {
    const { adminEmail, adminPassword } = req.body;
    try {
        const admin = await adminModel.findOne({ email: adminEmail });

        if (!admin) {
            return res.status(500).send("admin not found");
        }

        const response = await bcrypt.compare(adminPassword, admin.password);

        if (!response) {
            return res.status(500).send("Incorrect Password");
        }

        const token = jwt.sign({ adminId: admin.adminId }, JWT_ADMIN_PASSWORD);

        res.status(200).json({ token });
    } catch (e) {
        console.log(e);
        res.status(500).send("Error signing in admin");
    }
});
adminRouter.post('/course', auth , async function(req, res) {
    const adminId = req.adminId;
    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId: adminId
    });

    res.json({
        message: "Course created successfully",
        courseId: course._id
    });
});


adminRouter.put('/course', auth, async function (req, res) {
    const adminId = req.adminId;
    const { title, description, price, imageUrl, courseId } = req.body;

    await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    });

    res.json({
        message: "course updated"
    });
});

adminRouter.get('/course/bulk', auth, async function (req, res) {
    const adminId = req.adminId;

    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        message: "courses retrieved",
        courses
    });
});

module.exports = { adminRouter };
