import React, { useState, useEffect } from "react";

const HomeApi = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.restful-api.dev/objects")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {data &&
        data.map((item) => (
          <div
            key={item.id}
            className="w-72 p-4 border rounded-lg shadow-md bg-white ml-6"
          >
            <h2 className="text-lg font-bold text-blue-600">ID: {item.id}</h2>
            <h3 className="text-md font-semibold text-gray-800">
              Title: {item.name}
            </h3>

            {item.data && (
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                {Object.entries(item.data).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-medium capitalize">{key}:</span>{" "}
                    {value}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default HomeApi;
