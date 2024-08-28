import authMiddleware from "../../../authMiddleware";
import { supabase } from "../../lib/supabaseClient";

async function handler(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.query;
    console.log("Received Bill ID:", id); 

    const { data: selectedBill, error: fetchError } = await supabase
      .from("bills")
      .select("previous_month_id")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    const previousMonthId = selectedBill.previous_month_id;

    const { data: bills, error: listError } = await supabase
      .from("bills")
      .select("*")
      .eq("previous_month_id", previousMonthId)
      .eq("user_id", userId)

    if (listError) {
      throw listError;
    }
    console.log("Response Data:", bills);

    // Send the bills data as a response
    res.status(200).json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ error: error.message });
  }
}

export default authMiddleware(handler);
