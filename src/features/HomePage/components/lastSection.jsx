import { BsBag, BsCreditCard, BsTruck, BsEnvelope } from "react-icons/bs";

export default function LastSection() {
  return (
    <section className="w-full bg-[#f8fafc] dark:bg-[#020617] py-16 px-4 sm:px-8 md:px-12 lg:px-20">
      
      
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          How It Works
        </h2>
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          
          <div className="flex flex-col items-center text-center px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-4 transition-transform duration-300 hover:scale-110">
              <BsBag className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Browse Products
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              Explore our wide range of premium products
            </p>
          </div>

          
          <div className="flex flex-col items-center text-center px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-4 transition-transform duration-300 hover:scale-110">
              <BsCreditCard className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Add to Cart
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              Select your favorites and add them to your cart
            </p>
          </div>

          
          <div className="flex flex-col items-center text-center px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-4 transition-transform duration-300 hover:scale-110">
              <BsTruck className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Order & Receive
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              Place your order and get it delivered to your doorstep
            </p>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl w-full p-4 mx-auto mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4f46e5] to-[#4338ca]   dark:from-[#312e81] dark:via-[#1e1b4b] dark:to-[#0d0b2b] px-6 py-12 sm:px-12 sm:py-16 md:py-20 text-center shadow-xl shadow-indigo-100 dark:shadow-none">
          
          
          <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          
          <div className="relative z-10 flex flex-col items-center  w-full  gap-1 ">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white mb-2">
              <BsEnvelope className="text-2xl" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Stay Updated
            </h3>
            <p className="text-sm sm:text-base text-indigo-100 max-w-md leading-relaxed">
              Subscribe to our newsletter and get exclusive deals and new arrivals first.
            </p>

            
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row w-full max-w-md gap-3 mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3 rounded-xl bg-indigo-700/40 border border-indigo-400/30 text-white placeholder-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-white text-indigo-700 text-sm font-semibold hover:bg-indigo-50 active:scale-95 transition-all duration-150 shadow cursor-pointer whitespace-nowrap"
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
