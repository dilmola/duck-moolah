import { supabase } from "../../lib/supabaseClient";
import authMiddleware from "../../../authMiddleware";

async function handler(req, res) {
  if (!supabase) {
    console.error("Supabase client is not initialized");
    return res
      .status(500)
      .json({ error: "Supabase client is not initialized" });
  }

  if (req.method === "PATCH") {
    try {
      const userId = req.userId;
      console.log("User ID for create:", userId);
      const { idOfBill, ...billProps } = req.body;

      if (!idOfBill) {
        return res.status(400).json({ error: "Missing id in request body" });
      }

      if (Object.keys(billProps).length === 0) {
        return res.status(400).json({ error: "No fields to update provided" });
      }

      const { data, error } = await supabase
        .from("bills")
        .update(billProps)
        .eq("id", idOfBill)
        .eq("user_id", userId);

      if (error) throw error;

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error updating data:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authMiddleware(handler);
