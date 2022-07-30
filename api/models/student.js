import mongoose from "mongoose";

const studentModel = mongoose.Schema({

    name : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true
    },
    email : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true,
        unique : true
    },
    password : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true,
    },
    cell : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true,
        unique : true
    },
    username : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true,
        unique : true
    },
    photo : {
        type : String
    },
    age : {
        type : Number,
        requried : [ true, 'All fields are requried' ],
    },
    gender : {
        type : String
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    statue : {
        type : Boolean,
        default : true
    },
    trash : {
        type : Boolean,
        default : false
    }

}, {
    timestamps : true
});


// export default students model
export default mongoose.model( 'Student', studentModel )