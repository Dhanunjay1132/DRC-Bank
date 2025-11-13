import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./header";

function Transfer({ accounts, setAccounts, setActivities }) {
  const location = useLocation();
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [dropdownFromOpen, setDropdownFromOpen] = useState(false);
  const [dropdownToOpen, setDropdownToOpen] = useState(false);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  // Pre-select sender if passed from ViewAccounts
  useEffect(() => {
    if (location.state?.accountNo) {
      setFromAccount(location.state.accountNo);
      setSearchFrom(location.state.accountNo);
    }
  }, [location.state]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) setDropdownFromOpen(false);
      if (toRef.current && !toRef.current.contains(event.target)) setDropdownToOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter accounts based on search
  const filteredFromAccounts = accounts.filter(
    (acc) =>
      acc.accountNo.toString().includes(searchFrom) ||
      acc.name.toLowerCase().includes(searchFrom.toLowerCase())
  );
  const filteredToAccounts = accounts.filter(
    (acc) =>
      acc.accountNo.toString().includes(searchTo) ||
      acc.name.toLowerCase().includes(searchTo.toLowerCase())
  );

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

    // Update state and localStorage
    setAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    const newActivity = {
      type: "Transfer",
      detail: `₹${amt} transferred from ${fromAccount} - ${sender.name} to ${toAccount} - ${receiver.name}`,
      time: new Date(),
    };

    setActivities((prev) => {
      const updatedActivities = [newActivity, ...prev];
      localStorage.setItem("activities", JSON.stringify(updatedActivities));
      return updatedActivities;
    });

    setMessage(`✅ ₹${amt} transferred successfully!`);
    setFromAccount("");
    setToAccount("");
    setSearchFrom("");
    setSearchTo("");
    setAmount("");
    setDropdownFromOpen(false);
    setDropdownToOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-300 p-6">
      <Header />
      <div className="flex items-center justify-center mt-16">
        <div className="bg-white/90 backdrop-blur-md w-full max-w-lg rounded-2xl shadow-2xl p-8 transition-transform hover:scale-[1.01]">
          
          {/* Header section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-600 font-serif flex items-center gap-2">
              💸 Transfer Money
            </h2>
            <Link
              to="/"
              className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-indigo-500 hover:text-white text-gray-600 text-sm transition"
            >
              ⬅ Back
            </Link>
          </div>

          {/* Account Selection */}
          <div className="space-y-4">
            {/* From Account */}
            <div ref={fromRef} className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                From Account
              </label>
              <div
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus-within:ring-2 focus-within:ring-indigo-300 cursor-pointer"
                onClick={() => setDropdownFromOpen(!dropdownFromOpen)}
              >
                <input
                  type="text"
                  placeholder="🔍 Search From Account No. or Name"
                  value={searchFrom}
                  onChange={(e) => {
                    setSearchFrom(e.target.value);
                    setDropdownFromOpen(true);
                  }}
                  className="w-full outline-none text-gray-700"
                />
              </div>

              {dropdownFromOpen && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 max-h-40 overflow-y-auto rounded-lg mt-1 shadow-lg">
                  {filteredFromAccounts.length === 0 ? (
                    <li className="p-2 text-gray-500">No accounts found</li>
                  ) : (
                    filteredFromAccounts.map((acc) => (
                      <li
                        key={acc.accountNo}
                        className="p-2 hover:bg-indigo-100 cursor-pointer transition"
                        onClick={() => {
                          setFromAccount(acc.accountNo.toString());
                          setSearchFrom(acc.accountNo.toString());
                          setDropdownFromOpen(false);
                        }}
                      >
                        <span className="font-medium">{acc.accountNo}</span> -{" "}
                        {acc.name}{" "}
                        <span className="text-sm text-gray-600">(₹{acc.balance})</span>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>

            {/* To Account */}
            <div ref={toRef} className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                To Account
              </label>
              <div
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus-within:ring-2 focus-within:ring-indigo-300 cursor-pointer"
                onClick={() => setDropdownToOpen(!dropdownToOpen)}
              >
                <input
                  type="text"
                  placeholder="🔍 Search To Account No Or Name"
                  value={searchTo}
                  onChange={(e) => {
                    setSearchTo(e.target.value);
                    setDropdownToOpen(true);
                  }}
                  className="w-full outline-none text-gray-700"
                />
              </div>

              {dropdownToOpen && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 max-h-40 overflow-y-auto rounded-lg mt-1 shadow-lg">
                  {filteredToAccounts.length === 0 ? (
                    <li className="p-2 text-gray-500">No accounts found</li>
                  ) : (
                    filteredToAccounts.map((acc) => (
                      <li
                        key={acc.accountNo}
                        className="p-2 hover:bg-indigo-100 cursor-pointer transition"
                        onClick={() => {
                          setToAccount(acc.accountNo.toString());
                          setSearchTo(acc.accountNo.toString());
                          setDropdownToOpen(false);
                        }}
                      >
                        <span className="font-medium">{acc.accountNo}</span> -{" "}
                        {acc.name}{" "}
                        <span className="text-sm text-gray-600">(₹{acc.balance})</span>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>

            {/* Transfer Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Transfer Amount
              </label>
              <input
                type="number"
                placeholder="💰 Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleTransfer}
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition font-medium text-lg shadow-md"
            >
              Transfer Now
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

export default Transfer;