const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const tasksRoutes = require("./routes/tasksRoutes")

const app = express();

app.use(cors({
  origin: 'https://taskify-20ac7.web.app' // URL de Firebase
}));
app.use(express.json());
app.use("/api", tasksRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
})