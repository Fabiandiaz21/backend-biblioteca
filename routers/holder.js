const { Router } = require("express")
const httpholders = require("../controllers/holders")
const { helperHolder } = require("../helpers/holders")
const { validarCampos } = require("../Middlewares/Validar")
const { check } = require("express-validator")
const { validarJWT } = require("../Middlewares/validar-JWT")



const router = Router()

router.post("/", [  
    check("email", "El Email es obligatorio").notEmpty(),
    check("email", "el email ya esta en uso").custom(helperHolder.validarEmail),
    check("password", "La contraseña es obligatoria").notEmpty(),
    check("password", "Minimo 8 caracteres").isLength({ min: 8 }),
    check("document", "Minimo 8 caracteres").notEmpty(),
    check("ficha", "Ficha debe ser un numero").isNumeric(),
    validarCampos
], httpholders.postholder)

router.put("/:id",[
    validarJWT,
    check("id","id no valido"). isMongoId(),
    check("id", "no existe").custom(helperHolder.validarId),
    validarCampos
], httpholders.putholder)

router.get("/",[
    validarJWT,
    validarCampos
], httpholders.getlistar)  

router.get("/:id",[
    validarJWT,
    check("id","id no valido"). isMongoId(),
    check("id", "no existe").custom(helperHolder.validarId),
    validarCampos
], httpholders.getlistarid)

router.put("/activate/:id",[
    validarJWT,
    check("id","id no valido"). isMongoId(),
    check("id", "no existe").custom(helperHolder.validarId),
    validarCampos
], httpholders.putActivar)

router.put("/unactivate/:id",[
    validarJWT,
    check("id","id no valido"). isMongoId(),
    check("id", "no existe").custom(helperHolder.validarId),
    validarCampos
], httpholders.putInactivar)

router.delete("/:id",[
    validarJWT,
    check("id","id no valido"). isMongoId(),
    check("id", "no existe").custom(helperHolder.validarId),
    validarCampos
], httpholders.deleteholder)

router.post ("/login", [
 //   validarJWT,
    check("email", "El Email es obligatorio").notEmpty(),
    check("email", "el email ya esta en uso").custom(helperHolder.validarEmail),
    check("password", "La contraseña es obligatoria").notEmpty(),
    check("password", "Minimo 8 caracteres").isLength({ min: 8 }),
], httpholders.Postlogin) 

module.exports = router