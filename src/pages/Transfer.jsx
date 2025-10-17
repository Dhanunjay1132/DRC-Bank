import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Transfer({ accounts, setAccounts }) {
  const location = useLocation();
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.accountNo) {
      setFromAccount(location.state.accountNo); // pre-select sender
    }
  }, [location.state]);

  const handleTransfer = () => {
    const amt = Number(amount);
    if (!fromAccount || !toAccount) {
      setMessage("⚠️ Please select both accounts.");
      return;
    }
    if (fromAccount === toAccount) {
      setMessage("⚠️ Cannot transfer to the same account.");
      return;
    }
    if (!amt || amt <= 0) {
      setMessage("⚠️ Please enter a valid amount.");
      return;
    }

    const sender = accounts.find((acc) => acc.accountNo.toString() === fromAccount);
    const receiver = accounts.find((acc) => acc.accountNo.toString() === toAccount);

    if (!sender || !receiver) {
      setMessage("⚠️ Invalid account selection.");
      return;
    }

    if (sender.balance < amt) {
      setMessage("⚠️ Insufficient balance in sender account.");
      return;
    }

    const updatedAccounts = accounts.map((acc) => {
      if (acc.accountNo.toString() === fromAccount) return { ...acc, balance: acc.balance - amt };
      if (acc.accountNo.toString() === toAccount) return { ...acc, balance: acc.balance + amt };
      return acc;
    });

    setAccounts(updatedAccounts);
    setMessage(`✅ ₹${amt} transferred successfully!`);
    setFromAccount("");
    setToAccount("");
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-600">💸 Transfer Funds</h2>
          <Link to="/" className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white text-gray-500">
            ⬅ Back to Home
          </Link>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From Account</label>
            <select
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200"
            >
              <option value="">-- Select Sender Account --</option>
              {accounts.map((acc) => (
                <option key={acc.accountNo} value={acc.accountNo}>
                  {acc.accountNo} - {acc.name} (₹{acc.balance})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">To Account</label>
            <select
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200"
            >
              <option value="">-- Select Receiver Account --</option>
              {accounts.map((acc) => (
                <option key={acc.accountNo} value={acc.accountNo}>
                  {acc.accountNo} - {acc.name} (₹{acc.balance})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="button"
            onClick={handleTransfer}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Transfer Now
          </button>
        </div>

        {message && (
          <p className={`mt-4 text-center font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Transfer;
