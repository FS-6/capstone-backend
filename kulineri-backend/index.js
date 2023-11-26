const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./config/db");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const PORT = process.env.PORT || 3000;

db.then(() => {
  console.log("Database Connected ✅ 🚀");
}).catch(() => {
  console.log("Database not Connected ❌");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`server listening on port : ${PORT}`);
});
