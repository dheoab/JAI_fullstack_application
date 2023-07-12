const { User, Order } = require("../models/index");
const { encrypt, validateHash } = require("../helpers/encrypt");
const { signToken, validateToken } = require("../helpers/hasher");

class Controller {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(req.body, "req body");

      if (!email) {
        throw { name: "emailRequired" };
      }
      if (!password) {
        throw { name: "passwordRequired" };
      }

      console.log(req.body, " << req.body");
      const loggedUser = await User.findOne({
        where: {
          email: email,
        },
      });

      console.log(loggedUser, " << userData");

      if (!loggedUser) {
        throw { name: "notFound" };
      }

      const isValid = validateHash(password, loggedUser.password);

      if (!isValid) {
        throw { name: "notFound" };
      }

      const payload = {
        id: loggedUser.id,
      };

      console.log(loggedUser, " <<37");

      const token = signToken(payload);

      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "emailRequired") {
        res.status(400).json({
          message: "Email is required",
        });
      } else if (error.name === "passwordRequired") {
        res.status(400).json({
          message: "Password is required",
        });
      } else if (error.name === "notFound") {
        res.status(401).json({
          message: "Invalid email/password",
        });
      } else {
        res.status(500).json({
          message: "Internal server error",
        });
      }
    }
  }

  static async addOrder(req, res) {
    try {
      const { productName, productQuantity, price } = req.body;
      console.log(req.body);
      const { userId } = req.userData;

      const newOrder = await Order.create({
        productName: productName,
        productQuantity: productQuantity,
        price: price,
        userId: userId,
      });

      console.log(newOrder);

      res.status(201).json({
        statusCode: 201,
        data: newOrder,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({
          message: error.errors[0].message,
        });
      } else if ((error.name = "serverError")) {
        res.status(500).json({
          message: "Internal server error",
        });
      }
    }
  }

  static async readOrder(req, res) {
    try {
      const { userId } = req.userData;

      const orders = await Order.findAll({
        where: {
          userId: userId,
        },
      });

      if (!orders) {
        throw { name: "notFound" };
      }

      res.status(200).json({
        statusCode: 200,
        data: orders,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "notFound") {
        res.status(400).json({
          message: "No Orders",
        });
      } else if ((error.name = "serverError")) {
        res.status(500).json({
          message: "Internal server error",
        });
      }
    }
  }
}

module.exports = Controller;
