export default function ITProductsCard() {
  return (
    <a
      href="/it-products"
      className="
        relative
        block
        w-[320px]
        rounded-[20px]
        overflow-hidden
        border border-cyan-400/30
        bg-[#051224]/90
        backdrop-blur-2xl
        px-4
        py-4
        text-white
        transition-all
        duration-300
        hover:border-cyan-300
        hover:shadow-[0_0_40px_rgba(0,217,255,0.22)]
      "
    >
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,217,255,0.12),transparent_35%)] pointer-events-none" />

      {/* Inner Border Glow */}
      <div className="absolute inset-[1px] rounded-[20px] border border-cyan-400/10 pointer-events-none" />

      {/* TOP CONTENT */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Icon & Title */}
        <div className="flex items-center gap-3">
          <div
            className="
              min-w-[48px]
              h-[48px]
              rounded-[12px]
              flex
              items-center
              justify-center
              bg-cyan-400/10
              border border-cyan-400/20
              shadow-[0_0_25px_rgba(0,217,255,0.12)]
            "
          >
            <span className="text-[22px] text-cyan-300">
              🛒
            </span>
          </div>

          <h2 className="text-[24px] leading-none font-black text-cyan-300 tracking-[-1px]">
            IT Products
          </h2>
        </div>

        {/* DESCRIPTION */}
        <p className="text-[10px] leading-[1.3] text-white/75 font-medium">
          Wide range of quality IT products. Checked, good condition & affordable.
        </p>
      </div>

      {/* BUTTON */}
      <div className="relative z-10 mt-5">
        <button
          className="
            w-full
            h-[40px]
            rounded-[12px]
            bg-gradient-to-r
            from-sky-400
            to-blue-600
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
            hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]
          "
        >
          View Products

          <span className="text-[16px] mt-[-2px]">
            →
          </span>
        </button>
      </div>

      {/* FEATURES BADGES */}
      <div className="relative z-10 mt-4 space-y-2">
        <div className="flex items-center gap-2 text-cyan-300 text-[9px] font-semibold">
          <span className="text-[12px]">✓</span>
          <span>Quality Checked</span>
        </div>

        <div className="flex items-center gap-2 text-cyan-300 text-[9px] font-semibold">
          <span className="text-[12px]">✓</span>
          <span>Good Condition</span>
        </div>

        <div className="flex items-center gap-2 text-cyan-300 text-[9px] font-semibold">
          <span className="text-[12px]">✓</span>
          <span>Affordable Price</span>
        </div>
      </div>
    </a>
  )
}