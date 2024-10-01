const laptopModel = require("../models/laptops");
const QRCode = require("qrcode");

const httplaptop = {
  postlaptop: async (req, res) => {
    try {
      const { holder, serial, state, observations } = req.body;

      const qrCodeData = await QRCode.toDataURL(serial); 

      const laptop = new laptopModel({
        holder,
        serial,
        qrcode: qrCodeData, 
        state,
        observations,
      });
 
      await laptop.save();
      res.json({ laptop });
    } catch (error) {
      res.status(400).json({ error: "Falla en la operación" });
      console.log(error);
    }
  },

  putlaptop: async (req, res) => {
    try {
      const { id } = req.params;
      const { holder, serial, state, observations } = req.body;

      // Actualizar QR al modificar si es necesario
      const qrCodeData = await QRCode.toDataURL(serial);

      const laptop = await laptopModel.findByIdAndUpdate(id, {
        holder,
        serial,
        qrcode: qrCodeData, // Actualiza el QR también
        state,
        observations,
      }, { new: true });

      res.json({ laptop });
    } catch (error) {
      res.status(400).json({ error: "Falla en la operación" });
      console.log(error);
    }
  },

  getlistar: async (req, res) => {
    try {
      const laptops = await laptopModel.find();
      res.json({ laptops });
    } catch (error) {
      res.status(400).json({ error: "Falla en la operación" });
      console.log(error);
    }
  },

  getlistarid: async (req, res) => {
    try {
      const { id } = req.params;
      const laptop = await laptopModel.findById(id);
      res.json({ laptop });
    } catch (error) {
      res.status(400).json({ error: "Falla en la operación" });
      console.log(error);
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const laptop = await laptopModel.findByIdAndUpdate(id, { state: 1 }, { new: true });
      res.json({ laptop });
    } catch (error) {
      res.status(400).json({ error: "Falla en la operación" });
      console.log(error);
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const laptop = await laptopModel.findByIdAndUpdate(id, { state: 0 }, { new: true });
      res.json({ laptop });
    } catch (error) {
      res.status(400).json({ error: "Falla en la operación" });
      console.log(error);
    }
  },

  deleteLaptop: async (req, res) => {
    try {
      const { id } = req.params;
      const laptop = await laptopModel.findByIdAndDelete(id);
      if (!laptop) {
        return res.status(404).json({ error: "Laptop no encontrada" });
      }
      res.json({ message: "Laptop eliminada correctamente", laptop });
    } catch (error) {
      res.status(400).json({ error: "Falla en la operación" });
      console.log(error);
    }
  },
};

module.exports = httplaptop;

