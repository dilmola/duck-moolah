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

      const startOfLastMonth = moment()
        .subtract(1, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      const endOfLastMonth = moment()
        .subtract(1, "month")
        .endOf("month")
        .format("YYYY-MM-DD");

      const { data, error } = await supabase
        .from("bills")
        .select(
          `
        *,
        users:user_id(id, user_name)
      `
        )
        .eq("user_id", userId)
        .eq("type_of_bill", "dynamic")
        .gte("date_bill_created", startOfLastMonth)
        .lte("date_bill_created", endOfLastMonth)
        .order("id", { ascending: true });
      console.log("Supabase response data:", data);

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
