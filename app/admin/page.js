"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const pass = window.prompt("Enter password");

    if (pass === "admin123") {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) return <p>Loading...</p>;
  if (!authorized) return <h1>Access denied</h1>;

  return <h1>Welcome to admin</h1>;
}