require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyCustomer = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({
        message: "Access denied: Unauthorized",
      });
    }

    const token = authToken.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Access denied: Token is missing",
      });
    }

    const verifiedCustomer = jwt.verify(token, process.env.CUSTOMER_KEY);
    req.customer = verifiedCustomer;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid token for customer authentication" });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({
        message: "Access denied: Unauthorized",
      });
    }

    const token = authToken.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Access denied: Token is missing",
      });
    }

    const verifiedAdmin = jwt.verify(token, process.env.MASTER_KEY);
    req.admin = verifiedAdmin;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token for admin authentication" });
  }
};

module.exports = { verifyAdmin, verifyCustomer };
