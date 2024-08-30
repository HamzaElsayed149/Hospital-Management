const mongoose =require('mongoose')
const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    specialty:{type:String,        required:true
    },
    imageUrl:{ type:String,        required:true
    }
})

const doctorModel = mongoose.model('doctor',doctorSchema)

module.exports=doctorModel
