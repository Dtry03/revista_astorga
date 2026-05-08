const express = require("express");
const cors = require("cors");
require("dotenv").config();

const articlesRoutes = require("./routes/articles");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/articles", articlesRoutes);

app.get("/", (req, res) => {
  res.send("API revista funcionando");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});