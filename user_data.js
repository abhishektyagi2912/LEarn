const mongoose = require("mongoose");
// Connecting to database rdrishi
mongoose.connect("mongodb://127.0.0.1:27017/Learn")
.then(()=>{
  console.log("UserDatabase connected");
})
.catch((e)=>{
  console.log("UserDatabase Falied");
})
//Creating a new schema
const userschema = new mongoose.Schema({
    //  Name of user
      name:{
        type:String,
        required : true
      },
      // email of user
      email:{
        type:String,
        required : true
      },
      // Previous orders of user
      previous_orders :{
        type : Array,
        required:true
      },
      cart:{
        type: JSON,
        required:true
      }
    })
const collection = new mongoose.model("user_info",userschema);
// console.log("Hello");
module.exports=collection;