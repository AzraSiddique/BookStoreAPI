const csv = require("csv-parser");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const uploadBooks = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const books = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      const dateList = data.publishedDate.split("-");
      if (dateList.length === 3 && dateList[2].length === 4) {
      const updatedDate = `${dateList[2]}-${dateList[1]}-${dateList[0]}`;
      data.publishedDate = updatedDate;
      }
      books.push(data);
    })
    .on("end", async() => {
      const query = `
        INSERT INTO books (title, author, publishedDate, price, sellerId)
        VALUES ${books.map(book => `('${book.title}', '${book.author}', '${book.publishedDate}', ${book.price}, ${req.user.id})`).join(", ")}
      `;
      try {
        await req.db.query(query);
        res.json({ message: "Books uploaded successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
};

const getBooks = async (req, res) => {
  const query = "SELECT * FROM books";
  try {
    const [books] = await req.db.query(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM books WHERE id = ${id}`;
  try{
    const book=await req.db.query(query);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
    } else{
      res.json(book);
    }
    }catch(err){
      res.status(500).json({ error: err.message });
    }
  };

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publishedDate, price } = req.body;

  const query = `SELECT * 
  FROM books 
  WHERE id = ${id}`;
  try{
  const [books]=await req.db.query(query);
  if (books.length === 0) {
    return res.status(404).json({ error: "Book not found" });
  }
  
  const book = books[0];
    if (book.sellerId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorised.Cannot modify the contents" });
    } 
      const updateQuery = `
        UPDATE books
        SET title = '${title}', author = '${author}', publishedDate = '${publishedDate}', price = ${price}
        WHERE id = ${id}
      `;
      await req.db.query(updateQuery);
      res.json({ message: "Book updated successfully" });
    }catch(err){
          res.status(500).json({ error: err.message });
        }      
    }

const deleteBook = async (req, res) => {
  const { id } = req.params;
try{
  const query = `SELECT * 
  FROM books 
  WHERE id = ${id}`;
  const [books] = await req.db.query(query);

  if (books.length === 0) {
    return res.status(404).json({ error: "Book not found" });
  }

  const book = books[0]; 
  if (book.sellerId !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized. You can't delete the book." });
  } 

  const deleteQuery = `DELETE FROM books WHERE id = ${id}`;
  await req.db.query(deleteQuery);
  res.json({ message: "Book deleted successfully" });

}catch(err){
  res.status(500).json({ error: err.message });
}
 };
   
module.exports = { uploadBooks, getBooks, getBookById, updateBook, deleteBook };
