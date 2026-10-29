"use client";

import { useEffect, useState } from "react";

export default function TodayDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    function updateDate() {
      setDate(
        new Intl.DateTimeFormat("bn-BD", {
          timeZone: "Asia/Dhaka",
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date())
      );
    }

    updateDate();

    const timer = setInterval(updateDate, 60_000);

    return () => clearInterval(timer);
  }, []);

  return (
    <p className="min-h-4 text-[10px] text-gray-500 sm:text-xs">
      {date}
    </p>
  );
}