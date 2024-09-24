const { Router } = require('express');
const userRouter = Router();
const { userModel, purchaseModel, courseModel } = require('../db');  // Include courseModel for purchase lookup
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { JWT_USER_PASSWORD } = require('../config');
const auth = require('../middleware/user');  // Ensure proper middleware import

userRouter.post('/signup', async function (req, res) {
    const { userEmail, userPassword, userName } = req.body;
    try {
        const userHashedPassword = await bcrypt.hash(userPassword, saltRounds);
        await userModel.create({
            email: userEmail,
            password: userHashedPassword,
            name: userName
        });

        res.status(201).send('User created successfully');
    } catch (e) {
        res.status(500).send('Error signing up user');
    }
});

userRouter.post('/signin', async function (req, res) {
    const { userEmail, userPassword } = req.body;
    try {
        const user = await userModel.findOne({ email: userEmail });

        if (!user) {
            return res.status(500).send("User not found");
        }

        const response = await bcrypt.compare(userPassword, user.password);

        if (!response) {
            return res.status(500).send("Incorrect Password");
        }

        const token = jwt.sign({ userId: user.userId }, JWT_USER_PASSWORD);

        res.status(200).json({ token });
    } catch (e) {
        console.log(e);
        res.status(500).send("Error signing in user");
    }
});


userRouter.get('/purchases', auth, async function (req, res) {  // Use the middleware correctly
  const userId = req.userId;

  try {
      const purchases = await purchaseModel.find({ userId });

      const purchasedCourseIds = purchases.map(purchase => purchase.courseId);

      const coursesData = await courseModel.find({
          _id: { $in: purchasedCourseIds }
      });

      res.json({
          purchases,
          coursesData
      });
  } catch (e) {
      res.status(500).send("Error retrieving purchases");
  }
});

module.exports = { userRouter };
