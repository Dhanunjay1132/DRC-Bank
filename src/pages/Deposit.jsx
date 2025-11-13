import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./header";

function Deposit({ accounts, setAccounts, setActivities }) {
  const location = useLocation();
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);
  const containerRef = useRef(null);

  // Pre-select account if passed from ViewAccounts
  useEffect(() => {
    if (location.state?.accountNo) {
      setSelectedAccount(location.state.accountNo);
      setSearch(location.state.accountNo);
    }
  }, [location.state]);

  // Filter accounts based on search
  useEffect(() => {
    setFilteredAccounts(
      accounts.filter(
        (acc) =>
          acc.accountNo.toString().includes(search) ||
          acc.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, accounts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeposit = () => {
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

    const updatedAccounts = accounts.map((acc) =>
      acc.accountNo.toString() === selectedAccount
        ? { ...acc, balance: acc.balance + amt }
        : acc
    );

    // Update localStorage
    setAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    const newActivity = {
      type: "Deposit",
      detail: `₹${amt} deposited to ${selectedAccount} - ${account.name}`,
      time: new Date(),
    };

    // Log deposit activity
    setActivities((prev) => {
      const updatedActivities = [newActivity, ...prev];
      localStorage.setItem("activities", JSON.stringify(updatedActivities));
      return updatedActivities;
    });

    setMessage(`✅ ₹${amt} deposited successfully!`);
    setAmount("");
    setSelectedAccount("");
    setSearch("");
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-300 p-6">
      <Header />
      <div className="flex items-center justify-center mt-16">
        <div className="bg-white/90 backdrop-blur-md w-full max-w-lg rounded-2xl shadow-2xl p-8 transition-transform hover:scale-[1.01]">
          
          {/* Header section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-green-600 font-serif flex items-center gap-2">
              💰 Deposit Money
            </h2>
            <Link
              to="/"
              className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-green-500 hover:text-white text-gray-600 text-sm transition"
            >
              ⬅ Back
            </Link>
          </div>

          {/* Account Selection */}
          <div className="space-y-4">
            <div ref={containerRef} className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Select Account
              </label>
              <div
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus-within:ring-2 focus-within:ring-green-300 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <input
                  type="text"
                  placeholder="🔍 Search Account No. or Name"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setDropdownOpen(true);
                  }}
                  className="w-full outline-none text-gray-700"
                />
              </div>

              {dropdownOpen && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 max-h-40 overflow-y-auto rounded-lg mt-1 shadow-lg">
                  {filteredAccounts.length === 0 ? (
                    <li className="p-2 text-gray-500">No accounts found</li>
                  ) : (
                    filteredAccounts.map((acc) => (
                      <li
                        key={acc.accountNo}
                        className="p-2 hover:bg-green-100 cursor-pointer transition"
                        onClick={() => {
                          setSelectedAccount(acc.accountNo.toString());
                          setSearch(acc.accountNo.toString());
                          setDropdownOpen(false);
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

            {/* Deposit Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Deposit Amount
              </label>
              <input
                type="number"
                placeholder="💰 Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-300 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleDeposit}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-medium text-lg shadow-md"
            >
              Deposit Now
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

export default Deposit;