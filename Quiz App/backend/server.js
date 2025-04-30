const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key";

app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "23520008",
  database: "assignment_4",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL Database");
  }
});

// Create Users Table if not exists
db.query(
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL
  )`,
  (err, result) => {
    if (err) console.error("Error creating table:", err);
    else console.log("Users table is ready");
  }
);

// Predefined Admin Account
const adminEmail = "admin123@gmail.com";
const adminPassword = bcrypt.hashSync("admin123", 10);

db.query(
  "INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
  ["Admin", adminEmail, adminPassword, "admin"],
  (err, result) => {
    if (err) console.error("Error inserting admin:", err);
    else console.log("Admin account ready");
  }
);

// **Sign-up API**
app.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "User already exists or error occurred" });
      } else {
        res.status(201).json({ message: "User registered successfully" });
      }
    }
  );
});

// **Sign-in API**
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, role: user.role });
  });
});

// Save Quiz API
app.post("/save-quiz", (req, res) => {
  const questions = req.body.questions;

  questions.forEach((q) => {
    db.query(
      "INSERT INTO questions (question, option1, option2, option3, option4, correct_answer, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [q.question, q.options[0], q.options[1], q.options[2], q.options[3], q.correctAnswer, q.image],
      (err, result) => {
        if (err) console.error("Error inserting question:", err);
      }
    );
  });

  res.json({ message: "Quiz saved successfully!" });
});


app.get("/questions", (req, res) => {
  db.query("SELECT * FROM questions", (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error retrieving questions" });
    } else {
      res.json(results);
    }
  });
});


app.post("/submit-score", (req, res) => {
  const { name, score } = req.body;
  db.query("INSERT INTO student_scores (student_name, score) VALUES (?, ?)", [name, score], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error saving score" });
    } else {
      res.json({ message: "Score submitted successfully!" });
    }
  });
});

// app.get("/student-scores", (req, res) => {
//   db.query("SELECT * FROM student_scores", (err, results) => {
//     if (err) {
//       res.status(500).json({ message: "Error retrieving scores" });
//     } else {
//       res.json(results);
//     }
//   });
// });

// Get student score statistics
app.get("/student-scores", (req, res) => {
  db.query(
    `SELECT COUNT(*) AS total_students, 
            MAX(score) AS highest_score, 
            MIN(score) AS lowest_score 
     FROM student_scores`,
    (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error retrieving score statistics" });
      } else {
        res.json(results[0]); // Return total students, highest & lowest score
      }
    }
  );
});

// Update a question
app.put("/update-question/:id", (req, res) => {
  const { id } = req.params;
  const { question, options, correctAnswer, image } = req.body;

  db.query(
    "UPDATE questions SET question = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, correct_answer = ?, image_url = ? WHERE id = ?",
    [question, options[0], options[1], options[2], options[3], correctAnswer, image, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error updating question" });
      } else {
        res.json({ message: "Question updated successfully!" });
      }
    }
  );
});

// Delete a question
app.delete("/delete-question/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM questions WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error deleting question" });
    } else {
      res.json({ message: "Question deleted successfully!" });
    }
  });
});



// **Start Server**
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
