const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Controller = require("./controllers/controller");
const authN = require("./middlewares/authn");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/login", Controller.login);
app.post("/order", authN, Controller.addOrder);
app.get("/order", authN, Controller.readOrder);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
