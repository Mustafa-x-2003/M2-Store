import { BsBag, BsCreditCard, BsTruck, BsEnvelope } from "react-icons/bs";

export default function LastSection() {
  return (
    <section className="w-[90%] mx-auto bg-[var(--background)] py-16 px-4 sm:px-8 md:px-12 lg:px-20">
      
      
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
          How It Works
        </h2>
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          
          <div className="flex flex-col items-center text-center px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--info-light)] text-[var(--primary)] mb-4 transition-transform duration-300 hover:scale-110">
              <BsBag className="text-4xl font-extrabold"/>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
              Browse Products
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs leading-relaxed">
              Explore our wide range of premium products
            </p>
          </div>

          
          <div className="flex flex-col items-center text-center px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--info-light)] text-[var(--primary)] mb-4 transition-transform duration-300 hover:scale-110">
              <BsCreditCard className="text-4xl font-extrabold" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
              Add to Cart
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs leading-relaxed">
              Select your favorites and add them to your cart
            </p>
          </div>

          
          <div className="flex flex-col items-center text-center px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--info-light)] text-[var(--primary)] mb-4 transition-transform duration-300 hover:scale-110">
              <BsTruck className="text-4xl font-extrabold" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
              Order & Receive
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs leading-relaxed">
              Place your order and get it delivered to your doorstep
            </p>
          </div>
        </div>
      </div>

      
      <div className="w-full mx-auto mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3b82f6] via-[#2563eb] to-[#1d4ed8] dark:from-[#2563eb] dark:via-[#1d4ed8] dark:to-[#1e3a8a] opacity-90 px-6 py-12 sm:px-12 sm:py-16 md:py-20 text-center shadow-xl shadow-[var(--shadow)] dark:shadow-none">
          
          
          <div className="absolute -left-20 -top-20 w-64 h-62 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-64 h-62 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto gap-4 ">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-[var(--text-inverse)] mb-2">
              <BsEnvelope className="text-4xl font-extrabold" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-inverse)] tracking-tight">
              Stay Updated
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-inverse)] max-w-md leading-relaxed">
              Subscribe to our newsletter and get exclusive deals and new arrivals first.
            </p>

            
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row w-full max-w-md gap-3 mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3 rounded-xl bg-indigo-900/30 border border-[var(--primary-light)] text-white placeholder-indigo-200 text-sm focus:outline-none focus:border-[var(--primary-hover)] focus:ring-2 focus:ring-[var(--primary-hover)] focus:ring-offset-0 transition-all duration-200"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-white text-[var(--primary)] text-lg font-semibold  active:scale-95 hover:bg-white/90 transition-all duration-150 shadow-sm shadow-[var(--shadow)] whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

    </section>
  );
}
