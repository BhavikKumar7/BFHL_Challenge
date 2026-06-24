const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const bfhlRoutes = require("./routes/bfhlRoutes");

const app = express();

app.use(cors({
    origin: "*",
}));

app.use(express.json());

app.use("/bfhl", bfhlRoutes);

app.get("/", (req, res) => {
    res.send("BFHL API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});