"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const pass = prompt("Enter password");

    if (pass === "@9angLESEYApPLE@9") {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  }, []);

  if (allowed === null) return <h1>Loading...</h1>;

  if (!allowed) return <h1>Access denied</h1>;

  return <h1>Welcome to admin</h1>;
}