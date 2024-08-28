import authMiddleware from "../../../authMiddleware";
import { supabase } from "../../lib/supabaseClient";
import moment from "moment";

async function handler(req, res) {
  if (!supabase) {
    console.error("Supabase client is not initialized");
  }

  if (req.method === "GET") {
    try {
      const userId = req.userId;
      console.log("User ID:", userId);

      const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
      const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");

      const { data, error } = await supabase
        .from("bills")
        .select(
          `
        *,
        users:user_id(id, user_name)
      `
        )
        .eq("user_id", userId)
        .gte("date_bill_created", startOfMonth)
        .lte("date_bill_created", endOfMonth)
        .order("id", { ascending: true });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: error.message, stack: error.stack });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authMiddleware(handler);
