const jwt = require ('jsonwebtoken')
const Holders = require ('../models/holders')

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        console.log('Generando JWT con expiración de 30 días'); // Esto debe aparecer en la consola
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            { expiresIn: "30d" }, // Asegúrate de que este valor es el correcto
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });
};



const validarJWT = async (req, res, next)=>{
    const token = req.header("x-token");
    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        let user = await Holders.findById(uid)
        if(!user){
            return res.status(401).json({
                msg:"Token no valido - usuario no existe"
            })
        }
        if(!user.state){
            return res.status(401).json({
                msg:"Token no valido - usuario inactivo"
            })
        }
        next()

    } catch (error) {
        console.log(error);
        
        res.status(401).json({
            msg:"Token no valido"
        })
    }
}


module.exports={generarJWT, validarJWT}