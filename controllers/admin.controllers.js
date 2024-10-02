import { z } from "zod";
import CourseModel from "../Schemas/course.schema.js";
import cloudinary from "../Utils/cloudinary.js";

// Define the Zod schema for validation
const courseSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  price: z.number().positive("Price must be a positive number."),
  image: z.string().optional(), // Image will be uploaded and handled separately
});

export const createCourse = async (req, res) => {
  try {
    const { title, description, price } = courseSchema.parse(req.body);

    let image_URL = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "course_images", // Optional: Store in a specific folder
      });

      // Retrieve the secure URL from the Cloudinary response
      image_URL = result.secure_url;
    }

    // Create a new course with the uploaded image URL
    const newCourse = new CourseModel({
      title,
      description,
      price,
      image_URL, // Store the image URL from Cloudinary
      creatorId: req.user_id, // This should come from the isSignin middleware
    });

    // Save the course to the database
    await newCourse.save();

    return res.status(201).json({
      message: "Course created successfully!",
      course: newCourse,
    });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Error creating course:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { title, description, price } = courseSchema.parse(req.body);

    const course_id = req.params.course_id; // Get the course ID from the route parameter

    // Find the existing course by its ID
    const existingCourse = await CourseModel.findById(course_id);

    if (!existingCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    if (existingCourse.creatorId.toString() !== req.user_id) {
      return res.status(403).json({
        message: "You are not authorized to update this course",
      });
    }

    let image_URL = existingCourse.image_URL; // Keep existing image URL if no new image is provided
    if (req.file) {
      
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "course_images",
      });

      // Update the image URL with the new one
      image_URL = result.secure_url;
    }

    // Update the course with the new data
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      course_id,

      {
        title,
        description,
        price,
        image_URL,
      },
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      message: "Course updated successfully!",
      course: updatedCourse,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Error updating course:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
 
export const getCourses = async (req, res) => {
  try {
    // Fetch all courses created by the logged-in user
    const courses = await CourseModel.find({
      creatorId: req.user_id,
    });

   
    return res.json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
   
    console.error("Error fetching courses:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
