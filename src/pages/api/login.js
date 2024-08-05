import { supabase } from "../../lib/supabaseClient";
import jwt from "jsonwebtoken";
import cookie from "cookie"; // Import the cookie library

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables.");
    return res.status(500).json({ error: "Internal Server Error" });
  }

  if (req.method === "POST") {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    try {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_name", username)
        .single();

      if (error || !users) {
        console.error("Error finding user:", error);
        return res.status(401).json({ error: "Invalid username" });
      }

      // Create a JWT token manually
      const token = jwt.sign({ id: users.id }, JWT_SECRET, { expiresIn: "1d" });

      // Log the token to the console (optional, for debugging)
      console.log("Generated token:", token);

      // Set the token in a cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          // Use "token" as the cookie name
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
          maxAge: 60 * 60 * 24, // 1 day
          sameSite: "strict",
          path: "/", // Path where the cookie is valid
        })
      );

      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
