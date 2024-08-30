const mongoose =require('mongoose')
const patientSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    age:{type:Number},
    gender:{ type:String }
})

const patientModel = mongoose.model('patient',patientSchema)

module.exports=patientModel