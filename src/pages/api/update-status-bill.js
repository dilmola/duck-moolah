import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (!supabase) {
    console.error("Supabase client is not initialized");
  }

  if (req.method === "PATCH") {
    try {
      const { id, status_bill } = req.body; // Extract the ID and new status from the request body

      if (!id || !status_bill) {
        return res
          .status(400)
          .json({ error: "Missing id or status_bill in request body" });
      }

      const { data, error } = await supabase
        .from("bills")
        .update({ status_bill })
        .eq("id", id);

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
