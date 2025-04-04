const express = require("express");
const dbConnected = require("./config/db.conected");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const authRouter = require("./Route/userRoute");
const { notFound, errorHandler } = require("./Middleware/errorHandler");

dbConnected();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/api/user", authRouter);


app.use(notFound);
app.use(errorHandler); 


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});