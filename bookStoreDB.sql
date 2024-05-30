CREATE DATABASE book_store;
USE book_store;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role ENUM('seller', 'user') NOT NULL
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(200) NOT NULL,
  publishedDate DATE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  sellerId INT,
  FOREIGN KEY (sellerId) REFERENCES users(id)
);

INSERT INTO users (name, email, password, role)
VALUES 
  ('Emily Johnson', 'emily@gmail.com', 'password123', 'seller'),
  ('Scarlet Johnson', 'scarlet@gmail.com', 'password123', 'seller'),
  ('Michael Brown', 'michael@gmail.com', 'password456', 'user'),
  ('Sophia Davis', 'sophia@gmail.com', 'password789', 'user'),
  ('John Smith', 'john@gmail.com', 'password111', 'seller'),
  ('Alice Johnson', 'alice@gmail.com', 'password222', 'seller'),
  ('Bob Martin', 'bob@gmail.com', 'password333', 'user'),
  ('Nancy Drew', 'nancy@gmail.com', 'password444', 'user'),
  ('Henry Ford', 'henry@gmail.com', 'password555', 'user'),
  ('Olivia Benson', 'olivia@gmail.com', 'password666', 'user');

INSERT INTO books (title, author, publishedDate, price, sellerId)
VALUES 
  ('The Alchemist', 'Paulo Coelho', '1988-04-25', 749.25, 1),
  ('The Da Vinci Code', 'Dan Brown', '2003-03-18', 974.25, 1),
  ('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', '1997-06-26', 862.50, 1),
  ('The Hunger Games', 'Suzanne Collins', '2008-09-14', 636.75, 1),
  ('Gone Girl', 'Gillian Flynn', '2012-06-05', 599.25, 1),
  ('1984', 'George Orwell', '1949-06-08', 849.00, 2),
  ('Animal Farm', 'George Orwell', '1945-08-17', 749.50, 2),
  ('Pride and Prejudice', 'Jane Austen', '1813-01-28', 499.00, 2),
  ('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', 799.00, 2),
  ('The Catcher in the Rye', 'J.D. Salinger', '1951-07-16', 699.00, 2),
  ('Moby-Dick', 'Herman Melville', '1851-10-18', 899.00, 3),
  ('War and Peace', 'Leo Tolstoy', '1869-01-01', 1299.00, 3),
  ('Crime and Punishment', 'Fyodor Dostoevsky', '1866-01-01', 999.00, 3),
  ('Brave New World', 'Aldous Huxley', '1932-08-30', 749.00, 3),
  ('The Hobbit', 'J.R.R. Tolkien', '1937-09-21', 849.00, 3),
  ('The Kite Runner', 'Khaled Hosseini', '2003-05-29', 659.00, 4),
  ('The Girl with the Dragon Tattoo', 'Stieg Larsson', '2005-08-01', 799.00, 4),
  ('Life of Pi', 'Yann Martel', '2001-09-11', 699.00, 4),
  ('The Help', 'Kathryn Stockett', '2009-02-10', 549.00, 4),
  ('The Road', 'Cormac McCarthy', '2006-09-26', 749.00, 4);
  