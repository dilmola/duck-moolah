import cookie from "cookie";
import jwt from "jsonwebtoken";

// Define a secret key for verifying the JWT
const JWT_SECRET = process.env.JWT_SECRET;

export default function authMiddleware(handler) {
  return async (req, res) => {
    // Parse the cookies from the request headers
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token; // Retrieve the token using the new name

    // Debugging: Log the token
    console.log("Extracted token from cookies:", cookies);

    // If no token is found, return a 401 Unauthorized response
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.id;
      return handler(req, res);

      // Optionally, retrieve user information if needed
      // Example: const { data: user, error } = await supabase.auth.getUser(decoded.id);
      // if (error || !user) throw new Error("User not found");

      // Attach the user information to the req object
      req.user = decoded; // or attach the user object if retrieved from Supabase
      console.log("Authenticated user:", req.user);

      // Call the handler with the modified req and res objects
      return handler(req, res);
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}
