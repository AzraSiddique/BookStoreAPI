const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");

dotenv.config();

const app = express();
app.use(express.json());

const initDB = async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("Successfully connected to database");
    return db;
  } catch (e) {
    console.log(`DB error: ${e.message}`);
    process.exit(1);
  }
};

initDB().then((db) => {
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
})