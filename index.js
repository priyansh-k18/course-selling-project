require('dotenv').config();
console.log(process.env.MONGO_URL);

const express = require('express');
const app = express();
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/purchaseCourseProject');
}

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/admin', adminRouter);

app.listen(3000, () => {
    console.log("Your connected to port 3000");
});

