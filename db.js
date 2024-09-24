const mongoose = require('mongoose');
const {z} = require('zod');

const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
      userId : objectId,
      email : z.string().email('Invalid email format'),
      password: z.string().min(6,"password must be at least 6 characters"),
      name: z.string().min(1,"Name is required")
})

const adminSchema = new Schema({
       adminId:objectId,
       email : z.string().email('Invalid email format'),
       password: z.string().min(6,"password must be at least 6 characters"),
       name: z.string().min(1,"Name is required")
})

const courseSchema = new Schema({
       courseId:objectId,
       title: z.string().min(1, "Title is required"),
       description: z.string().min(1, "Description is required"),
       price: z.number().positive("Price must be a positive number"),
       imageUrl: z.string().url("Invalid URL format"),
       creatorId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid creator ID")
})

const purchaseSchema = new Schema({
       purschaseId: objectId,
       courseId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid course ID"),
       userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid user ID"),
})

const userModel = mongoose.model('user',userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course',courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
