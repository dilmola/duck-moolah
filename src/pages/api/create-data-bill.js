import { supabase } from "../../lib/supabaseClient";
import authMiddleware from "../../../authMiddleware";

async function handler(req, res) {
  if (!supabase) {
    console.error("Supabase client is not initialized");
    return res
      .status(500)
      .json({ error: "Supabase client is not initialized" });
  }

  if (req.method === "POST") {
    try {
      const userId = req.userId;
      console.log("User ID for create:", userId);

      const { type_of_bill, name_of_bill, due_date, bill_amount, status_bill } =
        req.body;

      if (!type_of_bill || !name_of_bill || !due_date || !bill_amount) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const { data, error } = await supabase.from("bills").insert([
        {
          type_of_bill: type_of_bill,
          name_of_bill: name_of_bill,
          due_date: due_date,
          bill_amount: bill_amount,
          status_bill: status_bill || "pending",
          user_id: userId, // Include user_id in the object
        },
      ]);

      if (error) throw error;

      console.log("Data inserted:", data);
      return res.status(200).json({ message: "Bill added successfully", data });
    } catch (error) {
      console.error("Error inserting data:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authMiddleware(handler);

