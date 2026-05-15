import React, { useEffect, useState } from "react";
import {
  FiTrash2,
  FiCheckCircle,
  FiMail,
  FiPhone,
  FiUser,
  FiClock,
  FiSearch,
} from "react-icons/fi";

export default function AdminDashboard() {

  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEnquiries = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/api/enquiries"
      );

      const data = await response.json();

      setEnquiries(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const deleteEnquiry = async (id) => {

    if (!window.confirm("Delete this enquiry?")) {
      return;
    }

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

  const filteredEnquiries = enquiries.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.phone.includes(search)
  );

  const totalEnquiries = enquiries.length;

  const completedCount = enquiries.filter(
    (e) => e.status === "Completed"
  ).length;

  const pendingCount = enquiries.filter(
    (e) => e.status !== "Completed"
  ).length;

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* HEADER */}
      <div className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <h1 className="text-4xl font-black tracking-tight">
              SAI INFOTECH
            </h1>

            <p className="text-slate-400 mt-1">
              Admin Dashboard
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full lg:w-96">

            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search enquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-blue-500"
            />
          </div>

        </div>
      </div>

      {/* DASHBOARD */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

            <h3 className="text-slate-400 text-sm">
              Total Enquiries
            </h3>

            <h2 className="text-5xl font-black mt-3">
              {totalEnquiries}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

            <h3 className="text-slate-400 text-sm">
              Pending
            </h3>

            <h2 className="text-5xl font-black text-yellow-400 mt-3">
              {pendingCount}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

            <h3 className="text-slate-400 text-sm">
              Completed
            </h3>

            <h2 className="text-5xl font-black text-green-400 mt-3">
              {completedCount}
            </h2>

          </div>

        </div>

        {/* ENQUIRIES */}
        <div className="grid gap-7">

          {filteredEnquiries.length === 0 && (

            <div className="text-center py-20 text-slate-500">
              No enquiries found
            </div>
          )}

          {filteredEnquiries.map((item) => (

            <div
              key={item._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:border-blue-500/40 transition-all duration-300"
            >

              {/* TOP */}
              <div className="p-7 border-b border-slate-800 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                <div className="space-y-4 flex-1">

                  {/* USER */}
                  <div className="flex items-center gap-3">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-xl font-bold">
                      {item.name?.charAt(0)}
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        {item.name}
                      </h2>

                      <div className="flex flex-wrap gap-4 mt-1 text-slate-400 text-sm">

                        <div className="flex items-center gap-2">
                          <FiMail />
                          {item.email}
                        </div>

                        <div className="flex items-center gap-2">
                          <FiPhone />
                          {item.phone}
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* MESSAGE */}
                  <div className="bg-slate-800/70 rounded-2xl p-5 border border-slate-700">

                    <h3 className="text-sm text-blue-400 font-semibold mb-3 uppercase tracking-wider">
                      Customer Message
                    </h3>

                    <p className="text-slate-300 leading-relaxed">
                      {item.message}
                    </p>

                  </div>

                  {/* SERVICES */}
                  <div>

                    <h3 className="text-sm text-cyan-400 font-semibold mb-3 uppercase tracking-wider">
                      Selected Services
                    </h3>

                    <div className="flex flex-wrap gap-3">

                      {item.services?.map((service, index) => (

                        <span
                          key={index}
                          className="px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm"
                        >
                          {service}
                        </span>
                      ))}

                    </div>

                  </div>

                </div>

                {/* STATUS + ACTIONS */}
                <div className="lg:w-64 flex flex-col gap-4">

                  <div className={`rounded-2xl p-5 border ${
                    item.status === "Completed"
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-yellow-500/10 border-yellow-500/30"
                  }`}>

                    <p className="text-sm text-slate-400 mb-1">
                      Status
                    </p>

                    <h3 className={`text-2xl font-bold ${
                      item.status === "Completed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}>
                      {item.status}
                    </h3>

                  </div>

                  <button
                    onClick={() => markCompleted(item._id)}
                    className="w-full bg-green-600 hover:bg-green-700 transition-all rounded-2xl py-4 font-semibold flex items-center justify-center gap-2"
                  >
                    <FiCheckCircle size={18} />
                    Mark Completed
                  </button>

                  <button
                    onClick={() => deleteEnquiry(item._id)}
                    className="w-full bg-red-600 hover:bg-red-700 transition-all rounded-2xl py-4 font-semibold flex items-center justify-center gap-2"
                  >
                    <FiTrash2 size={18} />
                    Delete
                  </button>

                  <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 text-sm text-slate-400">

                    <div className="flex items-center gap-2 mb-2">
                      <FiClock />
                      Created At
                    </div>

                    {new Date(item.createdAt).toLocaleString()}

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}