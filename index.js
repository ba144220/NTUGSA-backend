import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import departmentRoutes from "./routes/departments.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello to ntugsa-backend!!");
});

// Routes
app.use("/user", userRoutes);
app.use("/department", departmentRoutes);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
    )
    .catch((error) => console.log(`${error} did not connect`));
