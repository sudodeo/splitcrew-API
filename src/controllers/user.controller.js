const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

exports.getAllUsers = async (req, res) => {
  try {
    const result = await userModel.getAllUsers();
    res.status(200).json({ success: true, data: result.users });
  } catch (err) {
    res.status(500).json({
      message: "error occured, could not fetch users",
    });

    console.erroor(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const result = await userModel.getUser(req.body.email);
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({
      message: "error occured, could not create user",
    });
    console.error(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.password != req.body.confirmPassword) {
      res.status(400).json({
        success: false,
        error: "password and confirmPassword do not match",
      });
    }

    const existingUser = await userModel.getUser(req.body.email);
    if (existingUser) {
      res.status(409).json({ success: false, error: "user already exists" });
      return;
    }

    const user = await userService.registerUser(req.body);

    // Convert to local time zone and format the date as YYYY-MM-DD, because for some reason, node-postgres converts the date to UTC when it reads  from the database
    user.dob = new Date(user.dob).toLocaleDateString("en-CA");

    // don't send hashed password to client
    delete user.password;

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({
      message: "error occured, could not create user",
    });
    console.error(err);
  }
};