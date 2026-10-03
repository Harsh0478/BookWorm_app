import cloudinary from "../config/cloudinary.js";
import Book from "../models/Books.js";

const parseRating = (value) => {
  const rating = Number(value);
  return Number.isFinite(rating) ? rating : NaN;
};

export const uploadBooks = async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    const numericRating = parseRating(rating);

    if (!title?.trim() || !caption?.trim() || !image) {
      return res.status(400).json({
        success: false,
        message: "Title, caption and image are required",
      });
    }

    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "bookworm/books",
      resource_type: "image",
    });

    const newBook = await Book.create({
      title: title.trim(),
      caption: caption.trim(),
      rating: numericRating,
      image: uploadResponse.secure_url,
      cloudinaryPublicId: uploadResponse.public_id,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating book",
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(Number.parseInt(req.query.limit, 10) || 5, 1),
      50
    );
    const skip = (page - 1) * limit;

    const [books, totalBooks] = await Promise.all([
      Book.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "username profileImage")
        .lean(),
      Book.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: "All books fetched successfully",
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching books",
    });
  }
};

export const recomBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Your recommended books",
      books,
    });
  } catch (error) {
    console.error("Error fetching user books:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to find your recommended books",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own books",
      });
    }

    if (book.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(book.cloudinaryPublicId, {
          resource_type: "image",
        });
      } catch (error) {
        console.error("Cloudinary deletion failed:", error.message);
      }
    }

    await book.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete book",
    });
  }
};