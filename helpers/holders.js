const Holder = require("../models/holders");

const helperHolder = {
    validarEmail: async (email) => {
        const existe = await Holder.findOne({ email })
        if (existe) {
            throw new Error("El email ya existe")
        }
    },
    validarId: async (id) => {
        const existe = await Holder.findById(id)
        if (!existe) {
            throw new Error("Id no existe")
        }
    }
}
module.exports = { helperHolder }
