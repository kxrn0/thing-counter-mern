require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express("app");
const userRouter = require("./routes/userRouter");
const counterRouter = require("./routes/counterRouter");

/**
 * for when deploying to prod
 */
// const path = require("path");

// app.use(express.static(path.join(__dirname, "dist")));

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/counters", counterRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 9999;

    app.listen(PORT, () => console.log(`listening on ${PORT}`));

    console.log("connected to db");
  })
  .catch((error) => console.log(error));
