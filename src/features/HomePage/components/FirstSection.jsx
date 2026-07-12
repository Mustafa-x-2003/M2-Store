import { BsStars } from "react-icons/bs";

export default function FirstSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#3730a3] dark:bg-[#0d0b2b] min-h-[220px] sm:min-h-[260px] md:min-h-[300px]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4f46e5] via-[#4338ca] to-[#3730a3] dark:from-[#312e81] dark:via-[#1e1b4b] dark:to-[#0d0b2b] opacity-90" />

      <div className="absolute -right-24 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#6366f1]/30 blur-3xl pointer-events-none" />
      <div className="relative z-10 lg:mx-32 px-6 sm:px-10 md:px-16 py-14 sm:py-18 md:py-20 flex flex-col gap-4 sm:gap-5 max-w-[520px] sm:max-w-[580px] md:max-w-[620px]">

        
        <div className="flex items-center gap-2 w-fit">
          <BsStars className="text-yellow-300 text-base sm:text-lg drop-shadow-[0_0_6px_rgba(253,224,71,0.7)]" />
          <span className="text-xs sm:text-sm font-medium text-white/80 tracking-wide">
            Premium Shopping Experience
          </span>
        </div>

        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
          Shop the future,<br />delivered today
        </h1>

        
        <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-[360px]">
          Discover premium products at unbeatable prices. Fast delivery, easy
          returns, and exceptional quality.
        </p>

        <div className="flex flex-wrap gap-3 mt-1">
          <button className="px-5 py-2.5 rounded-md bg-white text-[#4338ca] text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-150 cursor-pointer">
            Shop Now
          </button>
          <button className="px-5 py-2.5 rounded-md border border-white/60 text-white text-sm font-semibold hover:bg-white/10 active:scale-95 transition-all duration-150 cursor-pointer">
            View Categories
          </button>
        </div>
      </div>
    </section>
  );
}