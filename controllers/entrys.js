const mongoose = require('mongoose');
const Entry = require("../models/entrys");  
const httpentrys = {


    postentry: async (req, res) => {
        try {
            const { laptop, entrytime, checkout, type } = req.body; 
    
            const newEntry = new Entry({
                laptop, entrytime, checkout, type
            });
    
            await newEntry.save();
            res.json({ newEntry });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

 
    getlistarHolder: async (req, res) => {
        try {
            const { id } = req.params; 
            const entries = await Entry.find({ laptop: id }) 
                                  .populate('laptop');  
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },
  
    
    getlistarDia: async (req, res) => {
        try {
            const { fecha } = req.body;  
            const inicioDelDia = new Date(fecha);
            const finDelDia = new Date(inicioDelDia.getTime() + 86400000);  
    
            const entries = await Entry.find({ entrytime: { $gte: inicioDelDia, $lt: finDelDia } });
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },
  
    getlistarFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;  
            const inicio = new Date(fechaInicio);
            const fin = new Date(new Date(fechaFin).getTime() + 86400000);  
    
            const entries = await Entry.find({ entrytime: { $gte: inicio, $lt: fin } });
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },
  
  
    postSalida: async (req, res) => {
        try {
            const { id } = req.params;  
            const { fechaSalida, motivo } = req.body;  
    
            const entry = await Entry.findByIdAndUpdate(id, { checkout: fechaSalida, motivo }, { new: true });  
            res.json({ entry });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },
};

module.exports = httpentrys;
