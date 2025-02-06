import express, { json } from "express";
import cors from "cors";
import db from "./util/db-connect.js";
import Tankstelle from "./models/Tankstelle.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.post("/tankstelle", async (req, res) => {
  try {

    const data = req.body.data; 

    const result = await Tankstelle.insertMany(data);
    console.log(result)
    res.json({ success: true, message: "Tankstellen erfolgreich gespeichert" });
  } catch (error) {
    console.error(" Fehler beim Speichern:", error);
    res.status(500).json({ error: "Fehler beim Speichern der Daten" });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port: ${PORT}`);
});
