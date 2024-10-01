const {Router}=require("express")
const httpholders=require("../controllers/holders")


const router=Router()

router.post("/", httpholders.postholder)

router.put ("/:id", httpholders.putholder)

router.get("/", httpholders.getlistar)

router.get ("/:id", httpholders.getlistarid)

router.put("/activate/:id", httpholders.putActivar)

router.put ("/unactivate/:id", httpholders.putInactivar)

router.delete ("/:id", httpholders.deleteholder)


module.exports=router