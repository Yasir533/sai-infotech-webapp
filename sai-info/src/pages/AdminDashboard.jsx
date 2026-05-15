import React, { useEffect, useState } from "react";

export default function AdminDashboard() {

  const [enquiries, setEnquiries] = useState([]);

  const fetchEnquiries = async () => {
    const response = await fetch(
      "http://localhost:5000/api/enquiries"
    );

    const data = await response.json();

    setEnquiries(data);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const deleteEnquiry = async (id) => {

    await fetch(
      `http://localhost:5000/api/enquiries/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchEnquiries();
  };

  const markCompleted = async (id) => {

    await fetch(
      `http://localhost:5000/api/enquiries/${id}`,
      {
        method: "PUT",
      }
    );

    fetchEnquiries();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid gap-6">

        {enquiries.map((item) => (

          <div
            key={item._id}
            className="bg-slate-800 p-6 rounded-xl border border-slate-700"
          >

            <div className="flex justify-between items-start">

              <div>
                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p>{item.email}</p>

                <p>{item.phone}</p>

                <p className="mt-3">
                  {item.message}
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">
                    Services:
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {item.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}

                  </div>
                </div>

                <p className="mt-4">
                  Status:
                  <span className="ml-2 text-yellow-400">
                    {item.status}
                  </span>
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => markCompleted(item._id)}
                  className="bg-green-600 px-4 py-2 rounded-lg"
                >
                  Complete
                </button>

                <button
                  onClick={() => deleteEnquiry(item._id)}
                  className="bg-red-600 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}