const { User, Voucher, Gift } = require("../models/index");
const { signToken, validateToken } = require("../helpers/hasher");

const authN = async (req, res, next) => {
  try {
    console.log("MASUK AUTHN");
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "forbidden" };
    }

    const userId = validateToken(access_token);
    console.log(userId, "userId");
    if (!userId) {
      throw { name: "invalidToken" };
    }

    const loggedUser = await User.findOne({
      where: {
        id: userId.id,
      },
    });

    if (!loggedUser) {
      throw { name: "invalidToken" };
    }

    req.userData = {
      userId: loggedUser.id,
      email: loggedUser.email,
    };

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "forbidden") {
      res.status(401).json({
        message: "Invalid token",
      });
    } else if (error.name === "invalidToken") {
      res.status(401).json({
        message: "Invalid token",
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

module.exports = authN;
