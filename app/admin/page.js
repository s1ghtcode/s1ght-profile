"use client";

export default function Admin() {
  const pass = prompt("Enter password");

  if (pass !== "1234") {
    return <h1>Access denied</h1>;
  }

  return <h1>Welcome to admin</h1>;
}
