import authMiddleware from "../../../authMiddleware";
import { supabase } from "../../lib/supabaseClient";
import moment from "moment"; // Import moment for date manipulation

// Custom function to convert JSON data to CSV format
function convertToCSV(data, headers) {
  if (!data || !data.length) {
    return "";
  }

  const keys = headers || Object.keys(data[0]);
  const headerRow = keys.join(",");

  const rows = data.map((row) => {
    return keys
      .map((key) => {
        const escapedValue = String(row[key] || "").replace(/"/g, '""');
        return `"${escapedValue}"`;
      })
      .join(",");
  });

  return [headerRow, ...rows].join("\n");
}

async function handler(req, res) {
  if (!supabase) {
    console.error("Supabase client is not initialized");
    return res
      .status(500)
      .json({ error: "Server error: Supabase client is not initialized" });
  }

  if (req.method === "GET") {
    try {
      const userId = req.userId;
      console.log("User ID:", userId);

      const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
      const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
      const timestamp = moment().format("YYYY-MMMM"); 

      const { data, error } = await supabase
        .from("bills")
        .select("*")
        .eq("user_id", userId)
        .gte("date_bill_created", startOfMonth)
        .lte("date_bill_created", endOfMonth);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      const headers = [
        ,
        "name_of_bill",
        "bill_amount",
        "status_bill",
        "date_bill_created",
        "due_date",
      ];

      const csvData = convertToCSV(data, headers);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=bills-${timestamp}.csv` // Dynamic filename
      );

      res.status(200).send(csvData);
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
