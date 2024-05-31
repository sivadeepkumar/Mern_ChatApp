const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
username:{
    type:String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
},
email: {
    type: String,
    required: true,
    unique: true,
    max:50,
},
password: {
    type: String,
    required: true,
    min:50,
},
isAvatarImageSet: {
    type:Boolean,
    default:false,
},
avatarImage: {
    type: String,
    default:"",
}
})

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;