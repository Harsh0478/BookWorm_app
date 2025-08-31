import express from "express";
import {
  uploadBooks,
  getBooks,
  deleteBook,
  recomBooks,
} from "../controllers/BooksController.js";
import protectRoute from "../middleware.js/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, uploadBooks);
router.get("/", protectRoute, getBooks);
router.get("/user", protectRoute, recomBooks);
router.delete("/:id", deleteBook);

export default router;
