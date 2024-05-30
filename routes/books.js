const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadBooks, getBooks, getBookById, updateBook, deleteBook } = require("../controllers/bookController");
const { authenticate, authorizeSeller } = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, "../uploads/") });

router.post("/upload", authenticate, authorizeSeller, upload.single("file"), uploadBooks);
router.get("/", authenticate, getBooks);
router.get("/:id", authenticate, getBookById);
router.put("/:id", authenticate, authorizeSeller, updateBook);
router.delete("/:id", authenticate, authorizeSeller, deleteBook);

module.exports = router;
