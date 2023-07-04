const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("./config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registartion ERROR ", errors });
      }

      const { username, password, isAdmin } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "User already registered" });
      }
      const hashPassword = bcrypt.hashSync(password, 5);

      const userRole = await Role.findOne({
        value: isAdmin ? "ADMIN" : "USER",
      });

      // const userRole = {};
      // if (isAdmin) {
      //   userRole = await Role.findOne({ value: "ADMIN" });
      // } else {
      //   userRole = await Role.findOne({ value: "USER" });
      // }

      const user = new User({
        username,
        password: hashPassword,
        roles: userRole.value,
      });

      await user.save();
      return res.status(200).json({ message: "User successfuly registered" });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Registration failed" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: `User ${username} not found` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(404).json({ message: `Incorrect password` });
      }

      //   console.log(user);
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Login failed" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new authController();
