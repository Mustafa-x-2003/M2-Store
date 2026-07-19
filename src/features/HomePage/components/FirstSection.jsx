import { BsStars } from "react-icons/bs";
import { useNavigate } from "react-router";
export default function FirstSection() {
  const navigate = useNavigate();
  return (
    <section className="relative w-full overflow-hidden bg-[#0f4c81] dark:bg-[#071a2f] min-h-[220px] sm:min-h-[190px] md:min-h-[300px]">
  <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]  dark:from-[#2563eb] dark:via-[#1d4ed8] dark:to-[#1e3a8a] opacity-90" />

      <div className="absolute -right-24 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#60a5fa]/30 blur-3xl pointer-events-none" />
      <div className="relative z-10 ml-2 sm:ml-4 md:ml-6 lg:ml-10 xl:ml-16 px-6 sm:px-8 md:px-10 py-14 sm:py-18 md:py-20 flex flex-col gap-4 sm:gap-5 max-w-[520px] sm:max-w-[580px] md:max-w-[620px]">

        
        <div className="flex items-center gap-2 w-fit">
          <BsStars className="text-yellow-300 text-base sm:text-lg drop-shadow-[0_0_6px_rgba(253,224,71,0.7)]" />
          <span className="text-sm font-medium text-[var(--text-inverse)] tracking-wide">
            Premium Shopping Experience
          </span>
        </div>

        
        <h1 className="text-5xl font-bold text-[var(--text-inverse)] leading-tight tracking-tight xl:text-6xl">
          Shop the future,<br />delivered today
        </h1>

        
        <p className="text-lg lg:text-xl text-[var(--text-inverse)] leading-relaxed max-w-[450px]">
          Discover premium products at unbeatable prices. Fast delivery, easy
          returns, and exceptional quality.
        </p>

        <div className="flex flex-wrap gap-3 mt-1">
          <button onClick={()=>navigate('/products')} className="px-5 py-2.5 rounded-md bg-white text-[var(--primary)] text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-150 cursor-pointer lg:px-5 lg:py-3 lg:text-lg border-[var(--border)]">
            Shop Now
          </button>
          <button className="px-5 py-2.5 rounded-md border border-slate-200/20 text-[var(--text-inverse)] text-sm font-semibold hover:bg-white/10 active:scale-95 transition-all duration-150 cursor-pointer lg:px-5 lg:py-3 lg:text-lg"
          onClick={()=>document.getElementById('shopCategory').scrollIntoView({behavior: 'smooth'})}
          >
            View Categories
          </button>
        </div>
      </div>
    </section>
  );
}