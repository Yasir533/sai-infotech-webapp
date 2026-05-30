import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

export default function ITProductsCard() {
  return (
    <Link
      to="/it-products"
      className="
        relative
        block
        w-full
        max-w-[420px]
        rounded-[20px]
        overflow-hidden
        border border-slate-200
        bg-[#fbfcfe]
        backdrop-blur-2xl
        px-5
        py-5
        text-slate-900
        transition-all
        duration-300
        hover:border-[#2f6fbf]/18
        hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)]
      "
    >
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,111,191,0.05),transparent_35%)] pointer-events-none" />

      {/* Inner Border Glow */}
      <div className="absolute inset-[1px] rounded-[20px] border border-slate-200 pointer-events-none" />

      {/* TOP CONTENT */}
      <div className="relative z-10 flex flex-col gap-3">

        {/* Icon & Title */}
        <div className="flex items-center gap-3">

          <div
            className="
              min-w-[48px]
              h-[52px]
              rounded-[16px]
              flex
              items-center
              justify-center
              bg-cyan-400/10
              border border-[#2f6fbf]/12
              shadow-[0_10px_22px_rgba(15,23,42,0.05)]
            "
          >
            <FiShoppingCart className="text-[22px] text-[#2f6fbf]" />
          </div>

          <h2 className="text-[22px] sm:text-[24px] leading-none font-black text-slate-900 tracking-[-1px]">
            IT Products
          </h2>

        </div>

        {/* DESCRIPTION */}
        <p className="text-[10px] leading-[1.3] text-slate-600 font-medium">
          Wide range of quality IT products. Checked, good condition and
          affordably priced for business procurement.
        </p>

      </div>

      {/* BUTTON */}
      <div className="relative z-10 mt-5">

        <button
          className="
            w-full
            h-[40px]
            rounded-[12px]
            bg-[#2f6fbf]
            text-white
            text-[13px]
            font-bold
            tracking-[-0.5px]
            flex
            items-center
            justify-center
            gap-2
            transition-all
            duration-300
            hover:scale-[1.01]
            hover:shadow-[0_12px_24px_rgba(47,111,191,0.18)]
          "
        >
          View Products

          <span className="text-[16px] mt-[-2px]">
            →
          </span>

        </button>

      </div>

      {/* FEATURES */}
      <div className="relative z-10 mt-4 flex items-center justify-between gap-3 flex-wrap">

        <div className="flex items-center gap-1 text-[#2f6fbf] text-[9px] font-semibold whitespace-nowrap">
          <span className="text-[12px]">✓</span>
          <span>Quality Checked</span>
        </div>

        <div className="flex items-center gap-1 text-[#2f6fbf] text-[9px] font-semibold whitespace-nowrap">
          <span className="text-[12px]">✓</span>
          <span>Good Condition</span>
        </div>

        <div className="flex items-center gap-1 text-[#2f6fbf] text-[9px] font-semibold whitespace-nowrap">
          <span className="text-[12px]">✓</span>
          <span>Affordable Price</span>
        </div>

      </div>
    </Link>
  )
}