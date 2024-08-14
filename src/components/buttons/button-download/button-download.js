import { useState } from "react";

import DownloadIcon from "../../../../public/icons/icon-download.png";
import Image from "next/image";

const ButtonDownload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/download-data-bill-bymonthyear");

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = response.headers
          .get("Content-Disposition")
          .split("filename=")[1]
          .replace(/"/g, "");
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Clean up
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.error("Download failed:", err);
      setError("Failed to download file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="text-[#F7B267] border border-[#F7B267] px-6 py-2 rounded-lg font-semibold flex flex-row space-x-2 items-center"
        aria-label="Download data"
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? (
          <span>Loading...</span> // Loading state
        ) : (
          <>
            <Image
              src={DownloadIcon.src}
              height={16}
              width={16}
              alt="Download icon"
            />
            <span>Download</span>
          </>
        )}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ButtonDownload;
