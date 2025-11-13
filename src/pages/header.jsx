import { Link } from "react-router-dom";
import DRCLogo from "../assets/components/DRC_Logo.png";


function Header() {
  return (
    <header style={{ marginTop: "-40px" }} className="  flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 font-serif">
      <div>
        <Link to="/">
          <div className="flex items-center p-3 rounded-lg shadow-md">
            <img
              src={DRCLogo}
              alt="Bank Logo"
              className="w-30 h-25"
            />
            <div>
              <h1 className="text-2xl font-bold text-blue-800 font-serif">
                DRC Bank
              </h1>
              <p style={{ fontStyle: 'italic' }} className="text-sm text-gray-700 ">
                A Secure and Reliable Banking Experience
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex gap-3">
        <Link
          to="/create"
          className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform"
        >
          ➕ Create Account
        </Link>
        <Link
          to="/accounts"
          className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform"
        >
          📋 View Accounts
        </Link>
      </div>
    </header>


  )
} export default Header;