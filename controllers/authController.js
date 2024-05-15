import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'
import {expressjwt} from "express-jwt";
export const authenticateJWT = expressjwt({ secret: 'MOBILEAPP', algorithms: ["HS256"] });

export const registerController=async(req,res)=>{
    try {
        const {name,email,password,phone}=req.body;
        //validation
        if(!name){
            return res.send({message:"Name is required"})
        }
        if(!email){
            return res.send({message:"Email is required"})
        }
        if(!password){
            return res.send({message:"Password is required"})
        }
        if(!phone){
            return res.send({message:"Phone No. is required"})
        }
        //check user
        const exisitingUser=await userModel.findOne({email});
        //exisiting user
        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:"User Already Register please login"
            })
        }
        //register user
        const hashedPassword=await hashPassword(password)
        const user=await new userModel({name,email,phone,password:hashedPassword}).save();
        res.status(201).send({
            success:true,
            message:"User Register SuccessFully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registration",
        })
    }
}
export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        console.log({email,password})
        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid Email or Password"
            })
        }
        //check user
        const user =await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"email is not register"
            })
        }
        const match= await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:"invalid password"
            })
        }
        //token
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}

export const updateProfileController = async (req, res) => {
    try {
        const { name,phone, email, password } = req.body;
        // Validation
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is Required!"
            });
        }
        
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User with this email does not exist."
            });
        }

        // Update user data
        const updates = { email };
        if (name) updates.name = name;
        if (phone) updates.phone = phone;
        if (password) updates.password = await hashPassword(password);

        const updatedUser = await userModel.findByIdAndUpdate(user._id, updates, { new: true });

        res.status(200).send({
            success: true,
            message: "User updated successfully",
            updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating profile",
            error: error.message
        });
    }
}
