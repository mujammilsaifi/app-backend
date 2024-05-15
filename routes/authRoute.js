import express from "express";
import {  authenticateJWT, loginController, registerController, updateProfileController } from "../controllers/authController.js";

const router=express.Router();
router.post("/register",registerController);
router.post("/login",loginController);
router.put("/update-profile",authenticateJWT,updateProfileController);
export default router;