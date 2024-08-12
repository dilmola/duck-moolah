import authMiddleware from "../../../authMiddleware";
import { supabase } from "../../lib/supabaseClient";
import moment from 'moment';

async function handler(req, res) {
  if (!supabase) {
    console.error("Supabase client is not initialized");
  }

  if (req.method === "GET") {
    try {
      const { userId } = req;
      const { month, year } = req.query;
      console.log({ month, year });

      const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
        .startOf("month")
        .format("YYYY-MM-DD");
      const endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");
      
      const { data: bills, error } = await supabase
        .from("bills")
        .select("*")
        .eq("user_id", userId)
        .gte("date_bill_created", startDate)
        .lte("date_bill_created", endDate)
        .order("id", { ascending: true }); // Add order clause

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
