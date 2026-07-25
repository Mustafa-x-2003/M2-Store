import { useState } from "react";
import { BsBag, BsCreditCard, BsTruck, BsEnvelope } from "react-icons/bs";
import { toast } from "react-hot-toast";
export default function LastSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email."); 
      return;
    }
    const storedEmails =
      JSON.parse(localStorage.getItem("subscribers")) || [];

    if (!storedEmails.includes(email)) {
      storedEmails.push(email);
      localStorage.setItem("subscribers", JSON.stringify(storedEmails));
      toast.success("Subscribed successfully!");
    } else {
      toast.error("This email is already subscribed.");
    }
    setEmail("");
  };

  return (
    <section className="w-full relative overflow-hidden rounded-[32px]  py-16 px-4 sm:px-8 md:px-12 lg:px-20">
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

      <div className="max-w-7xl mx-auto mt-14 px-4">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#38bdf8] via-[#2563eb] to-[#1e40af] dark:from-slate-900 dark:via-indigo-900 dark:to-violet-900 px-6 py-8 sm:px-10 sm:py-10 shadow-2xl">

         
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">

            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 mb-4">
              <BsEnvelope className="text-2xl text-white" />
            </div>

            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              Stay Updated
            </h3>

            <p className="mt-2 max-w-lg text-center text-sm sm:text-base text-white/80 leading-relaxed">
              Subscribe to our newsletter and receive exclusive offers,
              discounts, and the latest arrivals before everyone else.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none transition-all duration-300 focus:border-white focus:ring-2 focus:ring-white/30"
              />

              <button
                type="submit"
                className="rounded-xl bg-white py-3.5 px-7 text-sm font-semibold text-blue-700 hover:bg-slate-100 shadow-lg transition-all duration-300 hover:-translate-y-1  active:scale-95 cursor-pointer"
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