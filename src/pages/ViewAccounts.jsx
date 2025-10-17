import { Link, useNavigate } from "react-router-dom";

function ViewAccounts({ accounts = [] }) {
  const navigate = useNavigate();

  const handleAction = (accountNo, action) => {
    // Navigate to target page and send account number in state
    navigate(`/${action}`, { state: { accountNo } });
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">📋 Account List</h2>
          <Link
            to="/"
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            ⬅ Back to Home
          </Link>
        </div>

        {/* Table */}
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-blue-200">
            <tr>
              <th className="border p-2">Account No</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Balance</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {accounts.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No accounts yet.
                </td>
              </tr>
            ) : (
              accounts.map((acc) => (
                <tr key={acc.accountNo}>
                  <td className="border px-4 py-2">{acc.accountNo}</td>
                  <td className="border px-4 py-2">{acc.name}</td>
                  <td className="border px-4 py-2">{acc.phone}</td>
                  <td className="border px-4 py-2">₹{acc.balance}</td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm"
                        onClick={() => handleAction(acc.accountNo, "deposit")}
                      >
                        Deposit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 text-sm"
                        onClick={() => handleAction(acc.accountNo, "withdraw")}
                      >
                        Withdraw
                      </button>
                      <button
                        className="px-3 py-1 bg-indigo-400 text-white rounded hover:bg-indigo-500 text-sm"
                        onClick={() => handleAction(acc.accountNo, "transfer")}
                      >
                        Transfer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p className="text-center text-gray-500 mt-4 text-sm">
          Showing {accounts.length} account{accounts.length !== 1 ? "s" : ""}.
        </p>
      </div>
    </div>
  );
}

export default ViewAccounts;
