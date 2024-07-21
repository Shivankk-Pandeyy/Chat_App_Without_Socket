const mongoose=require('mongoose');
const ConnectDb=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/chatt");
        console.log("MongoDB Connected");
    }
    catch(err){
        console.log(err);
    }
}
module.exports=ConnectDb;