// pages/api/fetchData.js
import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (!supabase) {
    console.error("Supabase client is not initialized");
  }

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("bills").select("*");

      console.log("Data:", data);
      console.log("Error:", error);
      if (error) throw error;

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
