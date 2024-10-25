const mongoose = require('mongoose');
const Holder = require("../models/holders");
const bcryptjs = require("bcryptjs")
const token = require("../Middlewares/validar-JWT");
const { generarJWT } = require("../Middlewares/validar-JWT")


const httpholders = {
    // añadir
    postholder: async (req, res) => {
        try {
            const { email, password, document, name, rol, ficha, photo, phone, state } = req.body;
            const hashedPassword = bcryptjs.hashSync(password,10)
            const holder = new Holder({ email, password:hashedPassword, document, name, rol, ficha, photo, phone, state });
            await holder.save();
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    // modificar
    putholder: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const { email, password, document, name, rol, ficha, photo, phone, state } = req.body;
            const holder = await Holder.findByIdAndUpdate(id, { email, password, document, name, rol, ficha, photo, phone, state }, { new: true });
            if (!holder) {
                return res.status(404).json({ error: "Holder no encontrado" });
            }
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    // listar-todos
    getlistar: async (req, res) => {
        try {
            const holders = await Holder.find();
            res.json({ holders });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    // listar-id
    getlistarid: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const holder = await Holder.findById(id);
            if (!holder) {
                return res.status(404).json({ error: "Holder no encontrado" });
            }
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    // activar
    putActivar: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const holder = await Holder.findByIdAndUpdate(id, { state: 1 }, { new: true });
            if (!holder) {
                return res.status(404).json({ error: "Holder no encontrado" });
            }
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

    // inactivar
    putInactivar: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const holder = await Holder.findByIdAndUpdate(id, { state: 0 }, { new: true });
            if (!holder) {
                return res.status(404).json({ error: "Holder no encontrado" });
            }
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "La operación no se realizó correctamente" });
            console.log(error);
        }
    },

    // eliminar holder
    deleteholder: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            console.log("ID recibido para eliminar:", id);  // Log para verificar el ID
            const holder = await Holder.findById(id);
            if (!holder) {
                return res.status(400).json({ error: "Holder no encontrado" });
            }

            await Holder.findByIdAndDelete(id);
            res.json({ message: "Holder eliminado exitosamente", holder });
        } catch (error) {
            res.status(400).json({ error: "La operación no se realizó correctamente", details: error.message });
            console.log("Error al eliminar holder:", error);
        }
    },

    Postlogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const holder = await Holder.findOne({ email })
            if (!holder) {
                return res.status(400).json({
                    msg: "Holder / Password no son correctos"
                })
            }
            if (holder.estado === 0) {
                return res.status(400).json({
                    msg: "Holder Inactivo"
                })
            }
            const validPassword = bcryptjs.compareSync(password, holder.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Holder / Password no son correctos"
                })
            }
            const token = await generarJWT(holder.id);
            res.json({
                holder,
                token
            })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    }
}


module.exports = httpholders;
