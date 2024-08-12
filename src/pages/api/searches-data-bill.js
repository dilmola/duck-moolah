import authMiddleware from "../../../authMiddleware";
import { supabase } from "../../lib/supabaseClient";

async function handler(req, res) {
  if (!supabase) {
    console.error("Supabase client is not initialized");
  }

  if (req.method === "GET") {
    try {
      const userId = req.userId;
      const { q } = req.query;
      console.log("User ID:", { q });

      const { data: bills, error } = await supabase
        .from("bills")
        .select("*")
        .eq("user_id", userId)
        .or(
          `name_of_bill.ilike.%${q}%,type_of_bill.ilike.%${q}%,status_bill.ilike.%${q}%`
        )

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      res.status(200).json(bills);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authMiddleware(handler);
