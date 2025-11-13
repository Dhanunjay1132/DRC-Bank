import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./header";

function CreatAccount({ addAccount, setActivities }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = () => {
    if (fullName && phone) {
      const accountNo = String(Math.floor(1000000000 + Math.random() * 90000000000));
      const balance = initialDeposit ? Number(initialDeposit) : 0;

      const accountObj = {
        accountNo,
        name: fullName,
        phone,
        balance,
      };

      // Add account to central state
      addAccount(accountObj);

      // Persist in localStorage
      const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
      localStorage.setItem("accounts", JSON.stringify([accountObj, ...storedAccounts]));

      // Log activity for HomePage
      if (setActivities) {
        const newActivity = {
          type: "Account Created",
          detail: `Account ${accountNo} for ${fullName} created with balance ₹${balance}`,
          time: new Date(),
        };
        setActivities((prev) => {
          const updatedActivities = [newActivity, ...prev];
          localStorage.setItem("activities", JSON.stringify(updatedActivities));
          return updatedActivities;
        });
      }

      setMessage(`✅ Account created! Account no: ${accountNo}`);

      // Reset form
      setFullName("");
      setPhone("");
      setInitialDeposit("");
    } else {
      setMessage("⚠️ Please fill in all required fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-300 p-6">
      <Header />
      <div className="flex items-center justify-center mt-16">
        <div className="bg-white/90 backdrop-blur-md w-full max-w-lg rounded-2xl shadow-2xl p-8 transition-transform hover:scale-[1.01]">
          
          {/* Header section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-teal-600 font-serif flex items-center gap-2">
              🆕 Create Account
            </h2>
            <Link
              to="/"
              className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-teal-500 hover:text-white text-gray-600 text-sm transition"
            >
              ⬅ Back
            </Link>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="👤 Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-teal-300 outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="📱 Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-teal-300 outline-none"
              />
            </div>

            {/* Initial Deposit */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Initial Deposit (Optional)
              </label>
              <input
                type="number"
                placeholder="💰 Enter initial deposit"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-teal-300 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleCreate}
              className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition font-medium text-lg shadow-md"
            >
              Create Account
            </button>
          </div>

          {/* Message */}
          {message && (
            <p
              className={`mt-4 text-center font-medium text-lg ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatAccount;