import express from "express";
import { adminLogin } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/hello", (req, res) => {
  console.log("hit");
  res.send("hello");
});

export default adminRouter;
