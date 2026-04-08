const express = require("express");
const cors = require("cors");
require("dotenv").config();

const tasksRoutes = require("./routes/tasksRoutes")

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", tasksRoutes);

app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
})