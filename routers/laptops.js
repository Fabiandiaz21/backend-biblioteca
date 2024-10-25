const {Router}=require("express")
const httplaptop=require("../controllers/laptops")
const { validarCampos } = require("../Middlewares/Validar")
const { helperLaptop } = require("../helpers/laptops")
const { check } = require("express-validator")
const { validarJWT } = require("../Middlewares/validar-JWT")



const router=Router()

router.post ("/",[
    validarJWT,
    check("serial","Serial es obligatorio").notEmpty(),
    check("holder","Holder es obligatorio").notEmpty(),
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la bd").custom(helperLaptop.validarId),
    check("qrcode","QRCode es obligatorio").notEmpty(),
    check("qrcode", "El qrcode debe ser unico").custom(helperLaptop.validarQRCode),
    validarCampos
], httplaptop.postlaptop) 

router.put ("/:id",[
    validarJWT,
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la bd").custom(helperLaptop.validarId)
], httplaptop.putlaptop)

router.get ("/", httplaptop.getlistar)

router.get ("/:id",[
    validarJWT,
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la bd").custom(helperLaptop.validarId),
], httplaptop.getlistarid)

router.put ("/activar/:id",[
    validarJWT,
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la bd").custom(helperLaptop.validarId)
], httplaptop.putActivar)

router.put ("/unactivate/:id",[
    validarJWT,
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la bd").custom(helperLaptop.validarId)

], httplaptop.putInactivar)

router.delete ("/:id", httplaptop.deleteLaptop)


module.exports=router