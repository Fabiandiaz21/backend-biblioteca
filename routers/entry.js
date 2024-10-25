const {Router}=require("express")
const httpentrys=require("../controllers/entrys")
const { validarCampos } = require("../Middlewares/Validar")
const { check } = require("express-validator")
const {helperEntry} = require("../helpers/entrys")
const httpholders = require("../controllers/holders")
const { validarJWT } = require("../Middlewares/validar-JWT")



const router=Router()

router.post ("/", [
    check("holder","Id no valido").isMongoId(),
    check("holder","no existe en la bd").custom(helperEntry.validarHolder),
    check("date","la fecha es obligatoria").notEmpty(),
    check("date","la fecha debe ser unica").custom(helperEntry.validarDate),
    check("time","la hora es obligatoria").notEmpty(),
    check("time","la hora debe ser unica").custom(helperEntry.validarTime),
    check("state","el estado es obligatorio").notEmpty(),
    validarCampos
], httpentrys.postentry)

router.get ("/getlistarHolder/:id", [
    validarJWT,
    check("id","Id no valido").isMongoId(),
    check("id","no existe en la bd").custom(helperEntry.validarId),
    validarCampos
],httpentrys.getlistarHolder)

router.post ("/getlistarDia",  httpentrys.getlistarDia)

router.post ("/getlistarFechas", httpentrys.getlistarFechas)

router.post ("/postSalida/:id",[
    validarJWT,
    check("id","Id no valido").isMongoId(),
    check("id","no existe en la bd").custom(helperEntry.validarId),
    check("checkout","la fecha de salida es obligatoria").notEmpty(),
    validarCampos
], httpentrys.postSalida)

module.exports=router