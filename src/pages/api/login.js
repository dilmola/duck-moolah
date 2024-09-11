import { supabase } from "../../lib/supabaseClient";
import jwt from "jsonwebtoken";
import cookie from "cookie";

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

      const token = jwt.sign({ id: users.id }, JWT_SECRET, { expiresIn: "1d" });

      console.log("Generated token:", token);

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", 
          maxAge: 60 * 60 * 24,
          sameSite: "strict",
          path: "/",
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
