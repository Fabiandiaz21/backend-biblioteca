const {Router}=require("express")
const httplaptop=require("../controllers/laptops")

const router=Router()

router.post ("/", httplaptop.postlaptop) 

router.put ("/:id", httplaptop.putlaptop)

router.get ("/", httplaptop.getlistar)

router.get ("/:id", httplaptop.getlistarid)

router.put ("/activar/:id", httplaptop.putActivar)

router.put ("/unactivate/:id", httplaptop.putInactivar)

router.delete ("/:id", httplaptop.deleteLaptop)


module.exports=router