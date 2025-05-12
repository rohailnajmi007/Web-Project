import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ superAdmin: false, message: "Login again." });
    }
    const token_decode = jwt.verify(token, "project");

    if (token_decode !== "admin@forever.com" + "qwerty123") {
      return res.json({ superAdmin: false, message: "Login again." });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
