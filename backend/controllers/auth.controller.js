import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ succes: false, messagea: "All fields are required" })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, messagea: "invalid email" })
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, messagea: "Password must be at leat 6 character" })
        }
        const existingUserByEmail = await User.findOne({ email: email })

        if (existingUserByEmail) {
            return res.status(400).json({ success: false, messagea: "Email is already exists" })
        }

        const existingUserByUser = await User.findOne({ username: username })

        if (existingUserByUser) {
            return res.status(400).json({ success: false, messagea: "Username is already exists" })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        const PROFILE_PICS = ["/avtar1.png", "/avtar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image,
        });


        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: ""
            }
        })


    } catch (error) {
        console.log("Error in singup controller", error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export async function login(req, res) {
   try {
       const { email, password } = req.body;
       if (!email || !password) { 
           return res.status(400).json({ success: false, message: "All fields are required" });
       }
       const user = await User.findOne({ email: email })
       if (!user) { 
           return res.status(404).json({ success: false, message: "invalid password or email" });
       }
       const isPasswordCorrect = await bcryptjs.compare(password, user.password);
       if (!isPasswordCorrect) { 
        return res.status(404).json({ success: false, message: "invalid Credentials" });
       }
       generateTokenAndSetCookie(user._id, res);

       res.status(200).json({
        success: true,
        user: {
            ...User._doc,
            password: ""
        }
    })

   } catch (error) {
       console.log("Error in login controller", error.message);
       res.status(500).json({ success: false, message: "Internal server error" })

   }
}


export async function logout(req, res) {
  try {
      res.clearCookie("jwt-netflix");
      res.status(200).json({ success: true,message: "logged out successfully" });
  } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ success: false, message: "internal server error" });
  }
}


