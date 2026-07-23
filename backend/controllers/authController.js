const db = require("../config/db");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const login = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {
                return res.status(401).json({
                    message: "Invalid credentials"
                });
            }

            const user = results[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({
                    message: "Invalid credentials"
                });
            }

            const token = generateToken(user);

            res.json({
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        }
    );

};

const register = async (req, res) => {
  try {

    const promiseDb = db.promise();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must contain at least 6 characters",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const [existingUsers] = await promiseDb.query(
      "SELECT id FROM users WHERE email = ?",
      [normalizedEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message:
          "An account with this email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const [result] = await promiseDb.query(
      `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `,
      [
        name.trim(),
        normalizedEmail,
        hashedPassword,
      ]
    );

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: result.insertId,
        name: name.trim(),
        email: normalizedEmail,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message:
        "Server error while creating account",
    });
  }
};

module.exports = {
  register,
  login,
};

