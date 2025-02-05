const  mongoose  = require("mongoose")
const laptopSchema={
    holder:{type:mongoose.Schema.Types.ObjectId,ref:'Holder',required:true,},
    serial:{type:String, required:true},
    qrcode:{type:String,required:true,unique:true},
    state:{type:String,default:1},
    observations:{type:String},
    createdAt:{type:Date,default:Date.now }
   }

   module.exports=mongoose.model("laptop",laptopSchema)