import express from "express";
import {addToWishlist, removeFromWishlist, getUserWishlist } from "../controllers/wishlistControlller.js";
import authUser from "../middleware/auth.js";

const wishListRouter = express.Router();

wishListRouter.post("/get", authUser, getUserWishlist);
wishListRouter.post("/add", authUser, addToWishlist);
wishListRouter.post("/remove", authUser, removeFromWishlist);

export default wishListRouter;
