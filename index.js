// define http server, db, models, middlewears, core of application depends on this file

const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cartR")
const path = require("path");
const menuItems = require("./data/menuItems");
const cors = require("cors");
app.use(cors());
env.config();
const PORT = process.env.PORT || 3004;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World 123");
});

app.get("/menu", (req, res) => {
    res.json(menuItems);
})

app.use('/api/cart', cartRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/user", userRoutes); //importing routes

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    mongoose
        .connect(MONGO_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch(error => console.log(error));
});