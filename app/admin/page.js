"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

export default function Admin() {
  const [authorized, setAuthorized] = useState(null);

useEffect(() => {
  if (typeof window === "undefined") return;

  const pass = window.prompt("Enter password");

  if (pass === "@9angLESEYApPLE@9") {
    setAuthorized(true);
  } else {
    setAuthorized(false);
  }
}, []);

// add this anywhere
console.log("force rebuild");

  if (authorized === null) return <p>Loading...</p>;

  if (!authorized) return <h1>Access denied</h1>;

  return <h1>Welcome to admin</h1>;
}