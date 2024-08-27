import cookie from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default function authMiddleware(handler) {
  return async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token; 

    console.log("Extracted token from cookies:", cookies);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.id;
      return handler(req, res);

    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}
