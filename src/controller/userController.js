const db = require("../database/mongoDB");
const jwt = require("jsonwebtoken");
const { jokeApi } = require("../utils");

class Controller {
  userSignup = async (req, res, next) => {
    const response = {
      message: "Registration successfully!",
    };
    try {
      const existEmail = await db.existEmail(req.body.email);
      if (!existEmail) {
        await db.addUsers(req.body);
        response.success = true;
      } else {
        response.message = "Email already exist!";
        response.existEmail = true;
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  userLogin = async (req, res, next) => {
    const response = { message: "Invalid credential!", login: false };
    try {
      const user = await db.loginUser(req.body.email, req.body.password);
      if (user) {
        delete user.password;
        response.message = "Login successfully!";
        response.login = true;
        response.token = jwt.sign(user, process.env.SECRETE_KEY, {
          expiresIn: "1d",
        });
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  getJoke = async (req, res, next) => {
    const response = { message: "Get joke successfully!" };
    try {
      const jokeFromAPI = await fetch(jokeApi);
      if (!jokeFromAPI.ok) {
        response.message = "Network can not response perfectly";
      } else {
        response.data = await jokeFromAPI.json();
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  getUserById = async (req, res, next) => {
    const response = {
      message: "User not found with provided id!",
      data: null,
    };
    try {
      const user = await db.getUser(req.params.id);
      if (user) {
        response.message = "Get user successfully!";
        response.data = user;
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  userLogout = async (req, res, next) => {
    const response = {
      message: "User logout successfully!",
    };
    try {
      // const user = await "database logout function"
      // Do anything with database if you save any value when user logged in.
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Controller();
