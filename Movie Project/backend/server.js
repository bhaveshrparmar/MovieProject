const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = 5000;

require("./Config/db")();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const movieRoute = require("./routes/movie.route");
app.use("/api/movie", movieRoute);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
