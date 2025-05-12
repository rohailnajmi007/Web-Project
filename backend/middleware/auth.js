import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "project";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ success: false, message: "Login again." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const token_decode = jwt.verify(token, JWT_SECRET);
    req.body.userId = token_decode.id;

    // Debug log to verify the userId
    console.log("Authenticated userId:", req.body.userId);

    next();
  } catch (error) {
    console.log("JWT verification error:", error);
    res.json({ success: false, message: "Login again." });
  }
};

export default authUser;
