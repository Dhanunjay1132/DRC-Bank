import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import DRCLogo from "../assets/components/DRC_Logo.png";

function HomePage({
  accounts: propsAccounts = [],
  activities: propsActivities = [],
}) {
  // Use state and initialize from localStorage or props
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("accounts"));
      return Array.isArray(saved) ? saved : propsAccounts;
    } catch {
      return propsAccounts;
    }
  });

  const [activities, setActivities] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("activities"));
      return Array.isArray(saved) ? saved : propsActivities;
    } catch {
      return propsActivities;
    }
  });

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  // Total balance (safe)
  const totalBalance = Array.isArray(accounts)
    ? accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0)
    : 0;

  // Sort activities by latest first (safe)
  const recentActivities = Array.isArray(activities)
    ? [...activities].sort((a, b) => new Date(b.time) - new Date(a.time))
    : [];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF"];

  const pieData = Array.isArray(accounts)
    ? accounts.map((acc) => ({
      name: `${acc.name} (${acc.accountNo})`,
      value: acc.balance || 0,
    }))
    : [];

  return (
    <>
      <div className="mx-auto p-8 bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-400 min-h-screen">
        {/* header */}
        <Header />

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-cyan-800 text-white p-4 rounded-lg shadow text-center">
            <p className="text-sm text-white">Total Accounts</p>
            <p className="text-2xl font-semibold mt-2">{accounts.length}</p>
            <p className="text-xs text-gray-200 mt-1">
              Accounts created so far
            </p>
          </div>

          <div className="bg-cyan-800 text-white p-4 rounded-lg shadow text-center">
            <p className="text-sm text-white">Total Balance</p>
            <p className="text-2xl font-semibold mt-2">₹{totalBalance}</p>
            <p className="text-xs text-gray-200 mt-1">Combined balance</p>
          </div>

          <div className="bg-cyan-800 text-white p-4 rounded-lg shadow text-center">
            <p className="text-sm text-white">Quick Actions</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              <Link
                to="/deposit"
                className="px-5 py-1 bg-gradient-to-r from-yellow-300 to-yellow-600 text-white rounded shadow hover:scale-105 transition-transform"
              >
                💸Deposit
              </Link>
              <Link
                to="/withdraw"
                className="px-3 py-1  bg-gradient-to-r from-red-300 to-red-600 text-white rounded shadow hover:scale-105 transition-transform"
              >
                💳Withdraw
              </Link>
              <Link
                to="/transfer"
                className="px-5 py-1 bg-gradient-to-r from-indigo-300 to-indigo-600 text-white rounded shadow hover:scale-105 transition-transform"
              >
                🔄Transfer
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-xl max-h-[400px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
            <ul className="divide-y">
              {recentActivities.length === 0 ? (
                <li className="py-3 text-gray-500 text-center">
                  No recent activity
                </li>
              ) : (
                recentActivities.map((act, idx) => (
                  <li key={idx} className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{act.type}</p>
                        <p className="text-sm text-gray-600">{act.detail}</p>
                      </div>
                      <p className="text-xs text-gray-400">
                        {new Date(act.time).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Tips */}
          <aside className="bg-white p-4 rounded-lg shadow-xl">
            <h3 className="font-semibold mb-2">Tips</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Create an account using the Create Account button.</li>
              <li>Use the Deposit/Withdraw pages to update balances.</li>
              <li>
                Transfer between existing accounts using the Transfer page.
              </li>
              <li>Have a safe and secure banking in DRC</li>
            </ul>
          </aside>
        </section>

        <img src={DRCLogo} alt="Bank Logo" className="w-30 h-25 ml-155 mt-5" />

        <p className="text-blue-700 ml-135 font-bold font-serif">
          DRC Bank for your financial Security
        </p>
      </div>
    </>
  );
}

export default HomePage;
