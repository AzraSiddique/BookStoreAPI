const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try{
    const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ('${name}', '${email}', '${hashedPassword}', '${role}')
  `;
  await req.db.query(query);
  res.status(201).json({ message: "User registered successfully" });
  }catch(err){
    res.status(500).json({ error: err.message });
  }
  };

const login = async(req, res) => {
    try{
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    const [users]=await req.db.query(query);

    if (!users || users.length === 0) {
    return res.status(401).json({ error: "Invalid user" });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid Password" });
    } else {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
      res.json({ token });
    }}catch(err){
      res.status(500).json({ error: err.message });
    }
    
    }

module.exports = { signup, login };