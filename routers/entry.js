const {Router}=require("express")
const httpentrys=require("../controllers/entrys")

const router=Router()

router.post ("/",httpentrys.postentry)

router.get ("/getlistarHolder/:id",httpentrys.getlistarHolder)

router.post ("/getlistarDia", httpentrys.getlistarDia)

router.post ("/getlistarFechas", httpentrys.getlistarFechas)

router.post ("/postSalida/:id", httpentrys.postSalida)

module.exports=router