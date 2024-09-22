const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
      userId : objectId,
      email : String,
      password: String,
      name:String
})

const adminSchema = new Schema({
       adminId:objectId,
       email: String,
       password: String,
       name:String
})

const courseSchema = new Schema({
       courseId:objectId,
       title:String,
       description:String,
       price:Number,
       imageUrl:String,
       creatorId:objectId
})

const purchaseSchema = new Schema({
       purschaseId: objectId,
       courseId: objectId,
       userId: objectId
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
