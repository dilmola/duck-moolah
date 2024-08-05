import { supabase } from "../../lib/supabaseClient";
import authMiddleware from "../../../authMiddleware";

async function handler(req, res) {
  if (!supabase) {
    console.error("Supabase client is not initialized");
  }

  if (req.method === "DELETE") {
    try {
      const userId = req.userId;
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Missing id in request body" });
      }

      const { data, error } = await supabase
        .from("bills")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) throw error;

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error deleting data:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authMiddleware(handler);
