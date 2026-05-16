import { useState } from "react";

export default function ITProductsCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute left-16 bottom-10 z-20">
      {/* MAIN BUTTON CARD */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-[650px] rounded-[28px] overflow-hidden border border-cyan-400/30 bg-[#071326]/80 backdrop-blur-xl p-7 text-white transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_0_40px_rgba(0,217,255,0.35)]"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,217,255,0.12),transparent_40%)] pointer-events-none" />

        {/* TOP */}
        <div className="flex gap-5 items-start relative z-10">
          <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_20px_rgba(0,217,255,0.2)] text-cyan-300 text-3xl">
            🛒
          </div>

          <div className="text-left">
            <h2 className="text-[36px] font-bold text-cyan-300 mb-3 leading-none">
              IT Products
            </h2>

            <p className="text-white/80 leading-8 text-[17px] max-w-[470px]">
              We have a wide range of IT products for sale.
              Carefully checked, good quality and ready to use.
            </p>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-5 gap-4 mt-8 relative z-10">
          {[
            { icon: "💻", label: "Laptops" },
            { icon: "🖥️", label: "Desktops" },
            { icon: "🧠", label: "CPUs" },
            { icon: "🖥", label: "Monitors" },
            { icon: "🎧", label: "Accessories" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-cyan-400/10 bg-white/[0.03] py-5 transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-300/40 hover:-translate-y-1"
            >
              <div className="text-4xl">{item.icon}</div>

              <span className="text-white/90 text-[15px]">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* BOTTOM TAGS */}
        <div className="mt-7 pt-5 border-t border-white/10 flex justify-between flex-wrap gap-4 text-cyan-300 text-[15px] relative z-10">
          <span>✔ Quality Checked</span>
          <span>✔ Good Condition</span>
          <span>✔ Affordable Prices</span>
        </div>
      </button>

      {/* TOGGLE POPUP */}
      {open && (
        <div className="mt-5 w-[650px] rounded-[24px] border border-cyan-400/30 bg-[#071326]/95 backdrop-blur-xl p-6 text-white shadow-[0_0_35px_rgba(0,217,255,0.25)] animate-fadeIn">
          <h3 className="text-3xl font-bold text-cyan-300 mb-5">
            Available IT Products
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {[
              "Gaming Laptops",
              "Office Desktops",
              "CPUs",
              "Monitors",
              "Keyboard & Mouse",
              "Networking Devices",
              "UPS Systems",
              "Accessories",
            ].map((product) => (
              <div
                key={product}
                className="rounded-xl border border-cyan-400/20 bg-white/[0.03] px-5 py-4 hover:bg-cyan-400/10 transition"
              >
                {product}
              </div>
            ))}
          </div>

          <button
            onClick={() => setOpen(false)}
            className="mt-6 w-full rounded-xl bg-cyan-400 text-black font-bold py-3 hover:bg-cyan-300 transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}