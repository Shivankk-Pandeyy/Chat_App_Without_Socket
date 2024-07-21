const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        require:true,
        type:String,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    message:{
        type:Array,
        default:[
            {
                sendID:{
                    type:String,
                },
                recvID:{
                    type:String
                },
                Msg:{
                    type:String,
                }
            }
        ]
    },
    status:{
        type:String,
        default:"OFFLINE"
    }
},{timestamps:true});
const User=mongoose.model("User",userSchema);
module.exports=User;