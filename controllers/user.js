import bcrypt from "bcrypt"
import { User } from "../models/user.js";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";

export const Register = async (req, res, next) => {
    try {
        const { name, email, password, age, gender, mobile } = req.body;
        //Checking if user already exists or not
        let user = await User.findOne({ email })
        if (user) return next(new ErrorHandler("User Already Exists", 400));

        //Encrypting password 
        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: hashedPassword, age, gender, mobile })
        //
        sendCookie(user, res, "Registered", 201)
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //Check if user exists or not
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(Error("Invalid Email or Password", 400));
        //Check if the password is correct or not
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400));

        sendCookie(user, res, `Welcome back, ${user.name}`, 201)
    } catch (error) {
        next(error)
    }
}
export const logout = (req, res) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV == "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV == "Development" ? false : true,
        })
        .json({
            success: true,
            user: req.user,
        });

}