import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Withdraw({ accounts, setAccounts }) {
  const location = useLocation();
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.accountNo) {
      setSelectedAccount(location.state.accountNo);
    }
  }, [location.state]);

  const handleWithdraw = () => {
    const amt = Number(amount);
    if (!selectedAccount) {
      setMessage("⚠️ Please select an account.");
      return;
    }
    if (!amt || amt <= 0) {
      setMessage("⚠️ Please enter a valid amount.");
      return;
    }

    const account = accounts.find((acc) => acc.accountNo.toString() === selectedAccount);
    if (!account) {
      setMessage("⚠️ Account not found.");
      return;
    }
    if (account.balance < amt) {
      setMessage("⚠️ Insufficient balance.");
      return;
    }

    const updatedAccounts = accounts.map((acc) =>
      acc.accountNo.toString() === selectedAccount
        ? { ...acc, balance: acc.balance - amt }
        : acc
    );

    setAccounts(updatedAccounts);
    setMessage(`✅ ₹${amt} withdrawn successfully!`);
    setAmount("");
    setSelectedAccount("");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-600">🏧 Withdraw Amount</h2>
          <Link to="/" className="px-2 py-2 rounded hover:bg-blue-500 hover:text-white text-gray-500">
            ⬅ Back to Home
          </Link>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Account</label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200"
            >
              <option value="">-- Select Account --</option>
              {accounts.map((acc) => (
                <option key={acc.accountNo} value={acc.accountNo}>
                  {acc.accountNo} - {acc.name} (₹{acc.balance})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Withdraw Amount</label>
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
            onClick={handleWithdraw}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Withdraw Now
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

export default Withdraw;
