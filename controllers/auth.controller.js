import { z } from "zod";
import UserModel from '../Schemas/user.schema.js';
import AdminModel from '../Schemas/admin.schema.js';
import CourseModel from "../Schemas/course.schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define the Zod schema for validation
const signupSchema = z.object({
    firstname: z.string().min(1, "First name is required."),
    lastname: z.string().min(1, "Last name is required."),
    email: z.string().email("Invalid email format."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    role: z.enum(["user", "admin"], "Role must be either 'user' or 'admin'."),
});
const signinSchema = z.object({
    
    email: z.string().email("Invalid email format."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    role: z.enum(["user", "admin"], "Role must be either 'user' or 'admin'."),
});

export const signup = async function signup(req, res) {
    try {
      
        const { email, password, role } = signupSchema.parse(req.body);

       
        let existingUser;
        if (role === "admin") {
            existingUser = await AdminModel.findOne({ email });
        } else {
            existingUser = await UserModel.findOne({ email });
        }

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        
        let newUser;
        if (role === "admin") {
            newUser = new AdminModel({
                email,
                firstName: firstname,
                lastName: lastname,
                password: hashedPassword,
            });
        } else {
            newUser = new UserModel({
                email,
                firstName: firstname,
                lastName: lastname,
                password: hashedPassword,
            });
        }

      
        await newUser.save();

        
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

        return res.status(201).json({ message: "Signup successful!", user: newUser, token });
    } catch (error) {
        
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const signin = async function signin(req, res) {
    try {
        // Validate the request body against the Zod schema
        const { email, password, role } = z.object({
            email: z.string().email("Invalid email format."),
            password: z.string().min(6, "Password must be at least 6 characters long."),
            role: z.enum(["user", "admin"], "Role must be either 'user' or 'admin'."),
        }).parse(req.body);

        // Check if the user exists
        let existingUser;
        if (role === "admin") {
            existingUser = await AdminModel.findOne({ email });
        } else {
            existingUser = await UserModel.findOne({ email });
        }

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist." });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password." });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

        return res.status(200).json({ message: "Login successful!", user: existingUser, token });
    } catch (error) {
        // Check if the error is a Zod error
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const purchaseCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const userId = req.user_id; // assuming `isSignin` middleware adds user_id to `req`
  
      // Find the course by its ID
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Find the user
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the user has already purchased the course
      if (user.purchasedCourses.includes(courseId)) {
        return res.status(400).json({ message: "Course already purchased" });
      }
  
      // Add the course to the user's purchasedCourses array
      user.purchasedCourses.push(courseId);
      await user.save();
  
      return res.json({
        message: "Course purchased successfully",
        course,
      });
    } catch (error) {
      console.error("Error purchasing course:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };