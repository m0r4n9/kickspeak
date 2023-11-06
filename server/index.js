require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require('./app/middlewares/error-middleware');
const cookieParser = require('cookie-parser');
const sequelize = require("./db");
const router = require("./app/routes/reqular");
const adminRouter = require("./app/routes/admin");


// Function for auto create examples data
const {fillModelData} = require("./app/utils/fillingDatabase");

const PORT = process.env.PORT || 10000;

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
      credentials: true,
      origin: [
        "http://localhost:5173",
        "https://kickspeak.onrender.com",
        "http://localhost:4173",
        "http://192.168.0.16:5173"
      ]
    }
  ));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({extended: true}));
app.use("/api", router);
app.use('/api/admin', adminRouter);
app.use(errorHandler);


const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({});
    // await fillModelData();
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
