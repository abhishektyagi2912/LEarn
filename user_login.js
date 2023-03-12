const mongoose = require("mongoose");
// Connecting to database rdrishi
mongoose.connect("mongodb://127.0.0.1:27017/Learn")
.then(()=>{
  console.log("LoginDatabase connected");
})
.catch((e)=>{
  console.log("LoginDatabase Falied");
})
const LogInschema = new mongoose.Schema({
//  Name of user
  name:{
    type:String,
    required : true
  },
  email:{
    type:String,
    required : true,
  },
  // User Password
  password:{
    type:String,
    required : true
  }
})
const collection = new mongoose.model("login_data",LogInschema);
module.exports=collection;