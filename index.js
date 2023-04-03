import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

connectDB();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

const keeperSchema = mongoose.Schema({
  title: String,
  description: String,
});

const Keeper = new mongoose.model("Keeper", keeperSchema);

app.get("/api/getAll", async (req, res) => {
  try {
    const keeperList = await Keeper.find();
    res.status(200).send(keeperList);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/addNew", async (req, res) => {
  const { title, description } = req.body;
  const keeperObj = new Keeper({
    title,
    description,
  });
  console.log(keeperObj);
  try {
    const data = await keeperObj.save();
    const keeperList = await Keeper.find();
    res.status(200).send(keeperList);
  } catch (error) {
    console.log(error);
  }
});
app.post("/api/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Keeper.deleteOne({ _id: id });
    const keeperList = await Keeper.find();
    res.status(200).send(keeperList);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("Backend created at port 3001");
});
