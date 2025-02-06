import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
  attributes: {
    adresse: { type: String, required: true },  
    objectid: { type: Number, required: true },  
  },
  geometry: {
    x: { type: Number, required: true },  
    y: { type: Number, required: true },  
  },
});

const Tankstelle = mongoose.model("Tankstelle", apiSchema);

export default Tankstelle;
