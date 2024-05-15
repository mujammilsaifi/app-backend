import express from "express";
import { AddPostController, DeletePostController, GetPostController, UpdatePostController } from "../controllers/postController.js";
import { authenticateJWT } from "../controllers/authController.js";

const router=express.Router();
router.post("/add-post",authenticateJWT,AddPostController);
router.get("/get-post",authenticateJWT,GetPostController);
router.put("/update-post/",UpdatePostController);
router.delete("/delete-post/:pid",DeletePostController);
export default router;