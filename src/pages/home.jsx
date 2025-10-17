import { Link } from "react-router-dom";

function HomePage({ accounts }) {
  // Total balance
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  // Recent activities (last 5 actions)
  // For simplicity, we consider "Account Created" as activity
  const recentActivities = accounts
    .slice(-5)
    .reverse()
    .map((acc) => ({
      type: "Account Created",
      detail: `Account ${acc.accountNo} for ${acc.name}`,
      time: "Just now", // you can replace with timestamps if available
    }));

  return (
    <>
      <div className="mx-auto p-8 bg-gray-200 min-h-screen">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2 p-3 rounded-lg shadow-md">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAATlBMVEVHcEyZZV/LYz/VYjrfYS/kYCvlXyvkYCznXynmXyrVYjjjYCziYC7ZYjbeYTAiZ5oXaaQWaaYTaqohaaIoaZ4aaKEUa6oVaqgYaaU9aZXuQqIoAAAAGnRSTlMAChoue8/huP/yOp+PTV8eeL7vplo6/9mQiOvsO2IAAAElSURBVHgBjZJFgsUgDEAbNLiUpsz9LzrV78YGyIsnw68HGOcMXjMupFJS8JdMIxqDqO0zYw6ND0EodOwJRmMiLHGDRPEEPerNApYH3AKAlBz6XSZQ3aaccqmjQ3dC2cY8HXwqRLUssrAlptGNRHNOm91Ic2+T1TtlXobcS6W+0qnWvPoI6qAWAFKvtS2fTOPmAaJEJeDMo1NJA3TK1x5dO9BqnYbhgEeNR/dO2Gie1t9WXFQoNwqZ5rR4n6m0lJj3q8cgUfOFtXl3mCvNpUezmOy2ouW+WOxptkI0+iMX5lD/EVGZjjxS602jv7avlpxue+8OCAtkCR7miSocxfrnTVh7y5jVqOwTXIswWitUEZ4hRG0QjXxkx5dHISI/2bM1XPW/nX/XhA7+yBK5AQAAAABJRU5ErkJggg=="
                alt="Bank Logo"
                className="w-10 h-10 bg-white rounded"
                style={{ imageRendering: "crisp-edges" }}
              />
              <div>
                <h1 className="text-xl font-bold text-blue-600">
                  BlueCloud Bank
                </h1>
                <p className="text-sm text-gray-700">
                  A Secure and Reliable Banking Experience
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              to="/create"
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
            >
              ➕ Create Account
            </Link>
            <Link
              to="/accounts"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              📋 View Accounts
            </Link>
          </div>
        </header>
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
                className="px-3 py-1 bg-yellow-400 rounded text-sm"
              >
                Deposit
              </Link>
              <Link
                to="/withdraw"
                className="px-3 py-1 bg-red-400 rounded text-sm"
              >
                Withdraw
              </Link>
              <Link
                to="/transfer"
                className="px-3 py-1 bg-indigo-400 rounded text-sm"
              >
                Transfer
              </Link>
            </div>
          </div>
        </section>
        {/* Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
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
                      <p className="text-xs text-gray-400">{act.time}</p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Tips */}
          <aside className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Tips</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Create an account using the Create Account button.</li>
              <li>Use the Deposit/Withdraw pages to update balances.</li>
              <li>
                Transfer between existing accounts using the Transfer page.
              </li>
              <li></li>
            </ul>
          </aside>
        </section>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAATlBMVEVHcEyZZV/LYz/VYjrfYS/kYCvlXyvkYCznXynmXyrVYjjjYCziYC7ZYjbeYTAiZ5oXaaQWaaYTaqohaaIoaZ4aaKEUa6oVaqgYaaU9aZXuQqIoAAAAGnRSTlMAChoue8/huP/yOp+PTV8eeL7vplo6/9mQiOvsO2IAAAElSURBVHgBjZJFgsUgDEAbNLiUpsz9LzrV78YGyIsnw68HGOcMXjMupFJS8JdMIxqDqO0zYw6ND0EodOwJRmMiLHGDRPEEPerNApYH3AKAlBz6XSZQ3aaccqmjQ3dC2cY8HXwqRLUssrAlptGNRHNOm91Ic2+T1TtlXobcS6W+0qnWvPoI6qAWAFKvtS2fTOPmAaJEJeDMo1NJA3TK1x5dO9BqnYbhgEeNR/dO2Gie1t9WXFQoNwqZ5rR4n6m0lJj3q8cgUfOFtXl3mCvNpUezmOy2ouW+WOxptkI0+iMX5lD/EVGZjjxS602jv7avlpxue+8OCAtkCR7miSocxfrnTVh7y5jVqOwTXIswWitUEZ4hRG0QjXxkx5dHISI/2bM1XPW/nX/XhA7+yBK5AQAAAABJRU5ErkJggg=="
          alt="Bank Logo"
          className="w-10 h-10 ml-180 mt-10 bg-white rounded"
          style={{ imageRendering: "crisp-edges" }}
        />
        <p className="text-blue-500 ml-149 mt-1 font-bold">
          {" "}
          BlueCloud Bank for your finacial Security{" "}
        </p>{" "}
      </div>
    </>
  );
}

export default HomePage;
