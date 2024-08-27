import { supabase } from "../../lib/supabaseClient";
import moment from "moment-timezone";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const startOfLastMonth = moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD");
    const endOfLastMonth = moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD");

    const { data: fixedBills, error } = await supabase
      .from("bills")
      .select("*")
      .eq("type_of_bill", "fixed")
      .gte("due_date", startOfLastMonth)
      .lte("due_date", endOfLastMonth);

    if (error) throw error;

    if (fixedBills.length === 0) {
      return res.status(200).json({ message: "No fixed bills found for the previous month" });
    }

    for (const bill of fixedBills) {
      const newDueDate = moment(bill.due_date).add(1, "month").format("YYYY-MM-DD");

      const { error: insertError } = await supabase
        .from("bills")
        .insert([
          {
            type_of_bill: bill.type_of_bill,
            name_of_bill: bill.name_of_bill,
            due_date: newDueDate,
            bill_amount: bill.bill_amount,
            status_bill: "pending",
            user_id: bill.user_id,
            date_bill_created: moment().tz("Asia/Kuala_Lumpur").format(),
            previous_month_id: bill.id,
          },
        ]);

      if (insertError) throw insertError;
    }

    return res.status(200).json({ message: "Fixed bills duplicated successfully for the new month." });
  } catch (error) {
    console.error("Error duplicating fixed bills:", error);
    return res.status(500).json({ error: error.message });
  }
}
