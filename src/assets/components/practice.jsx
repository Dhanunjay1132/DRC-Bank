export function Practice() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-orange-500 to-pink-500 p-4 ">
      <form className="bg-gray-100 bg-opacity-90 backdrop-blur-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center ">
          Personal Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            {/* Full Name */}
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-500"
            />

            {/* Email */}
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-500"
            />

            {/* Phone */}
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-500"
            />

            {/* Address */}
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-500"
            />
          </div>
          <div>
            {/* Date */}
            <label className="block text-gray-700 font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              className=" text-gray-500 w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent "
            />

            {/* Select */}
            <label className="block text-gray-700 font-medium mb-1">
              Select Option
            </label>
            <select className=" text-gray-500  w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>

            {/* Checkboxes */}
            <label className="block text-gray-700 font-medium mb-2">
              Check one item
            </label>
            <div className="flex items-center mb-4 space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-3 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                />
                <span className="text-gray-700">Item 1</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-3 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                />
                <span className="text-gray-700">Item 2</span>
              </label>
            </div>

            {/* Radio */}
            <label className="block text-gray-700 font-medium mb-2">
              Select one
            </label>
            <div className="flex items-center mb-6 space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="radio"
                  className="h-3 w-4 text-blue-500 border-gray-300 focus:ring-blue-400"
                />
                <span className="text-gray-700">Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="radio"
                  className="h-3 w-4 text-blue-500 border-gray-300 focus:ring-blue-400"
                />
                <span className="text-gray-700">Female</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
