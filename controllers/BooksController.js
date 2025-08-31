import cloudinary from "../config/cloudinary.js";
import Book from "../models/Books.js";

// Upload Books
import cloudinary from "../config/cloudinary.js";
import Book from "../models/Books.js";

// Upload Books
export const uploadBooks = async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;

    if (!title || !caption || !rating || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields should be filled",
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not found, token may be invalid",
      });
    }

    // Log first 50 chars of the image Base64 for debugging
    console.log("Received image (start):", image?.slice(0, 50));
    console.log("Title:", title, "Caption:", caption, "Rating:", rating);
    console.log("User ID:", req.user._id);

    let uploadResponse;
    try {
      uploadResponse = await cloudinary.uploader.upload(image);
      console.log("Cloudinary Response:", uploadResponse);
    } catch (cloudErr) {
      console.error("Cloudinary upload error:", cloudErr.message);
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed",
        error: cloudErr.message,
      });
    }

    const imageUrl = uploadResponse.secure_url;

    // Save to DB
    let newBook;
    try {
      newBook = await Book.create({
        title,
        caption,
        rating,
        image: imageUrl,
        user: req.user._id,
      });
      console.log("Book saved:", newBook._id);
    } catch (dbErr) {
      console.error("Database save error:", dbErr.message);
      return res.status(500).json({
        success: false,
        message: "Database error while creating book",
        error: dbErr.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "New Book is added Successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({
      success: false,
      message: "Unexpected error creating book",
      error: error.message,
    });
  }
};


// Fetch Books
export const getBooks = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate("user", "username profileImage");

    const totalBooks = await Book.countDocuments();

    res.status(200).json({
      success: true,
      message: "All Books Fetched Sucessfully",
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching books",
      error: error.message,
    });
  }
};

// Uploded Books

export const recomBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ success: true, message: "Your recommended books", books });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "Unable to finde your recommended books",
    });
  }
};

// delete Books
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params.id;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not Found",
      });
    }

    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    if (book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("Error while deleting image from Cloudinary");
      }
    }

    await book.deleteOne();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete a book",
      error: error.message,
    });
  }
};
