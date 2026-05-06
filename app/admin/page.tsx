"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function Admin() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pass = window.prompt("Enter password");

    if (pass === "@9angLESEYApPLE@9") {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) return <p>Loading...</p>;
  if (!authorized) return <h1>Access denied</h1>;

  return <h1>Welcome to admin</h1>;
}