const { default: mongoose } = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:[3]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    github:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    profile:{
        type:String,
    }
})

const Users = new mongoose.model('users',userSchema)

module.exports = Users;