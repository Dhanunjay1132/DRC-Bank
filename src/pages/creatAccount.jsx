import { useState } from "react";
import { Link } from "react-router-dom";

function CreatAccount({ addAccount }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = () => {
    if (fullName && phone) {
      const accountNo = String(Math.floor(1000000000 + Math.random() * 90000000000));
      const balance = initialDeposit ? Number(initialDeposit) : 0;

      // build account object and send to App state
      const accountObj = {
        accountNo,
        name: fullName,
        phone,
        balance
      };

      addAccount(accountObj);            // <-- NEW: updates central state
      setMessage(`✅ Account created! Account no: ${accountNo}`);

      // reset form
      setFullName("");
      setPhone("");
      setInitialDeposit("");
    } else {
      setMessage("⚠️ Please fill in all required fields.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create Bank Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded focus:outline-blue-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 border rounded focus:outline-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="number"
            placeholder="Initial Deposit (optional)"
            className="w-full p-3 border rounded focus:outline-blue-500"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition"
          >
            Create Account
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center text-gray-700 text-sm">{message}</p>
        )}

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-500 hover:text-blue-900">
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatAccount;
