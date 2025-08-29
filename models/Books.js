import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    caption: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
      min: 1,
      max: 5,
    },
    image: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
