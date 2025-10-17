import React, { useState } from 'react';

export function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      onLogin(data.username);
      alert("Successfully login");
    } else {
      alert("Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong!");
  }
};


  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-gray-900">
      <h1 className="text-4xl mb-4 text-yellow-500">Login Page</h1>
      <form onSubmit={handleLogin} className="w-80 space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
