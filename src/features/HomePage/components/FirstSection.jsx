import { BsStars } from "react-icons/bs";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router";
import { FaStar } from "react-icons/fa";
import { SiShopify } from "react-icons/si";

export default function FirstSection() {
  const navigate = useNavigate();

  return (
    <section className="relative  isolate min-h-screen pt-10 overflow-hidden bg-[var(--background)] transition-colors duration-300">
      <div className="absolute -right-40 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[var(--primary)]/20 blur-[120px]" />

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:px-12">
        {/* =========================
            LEFT CONTENT
        ========================== */}
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/70 px-4 py-2 text-sm text-[var(--text-secondary)] shadow-[var(--shadow)] backdrop-blur-md transition-colors duration-300">
            <BsStars className="text-[var(--warning)]" />

            <span>Premium Shopping Experience</span>
          </div>

          <h1 className="mb-7 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text)] sm:text-6xl lg:text-7xl">
            Shop smarter.
            <br />
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--info)] bg-clip-text text-transparent">
              Live better.
            </span>
          </h1>

          <p className="mb-9 max-w-xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
            Discover premium products, unbeatable prices, and a shopping
            experience designed around you.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/shop")}
              className="group flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-200 hover:bg-[var(--primary-hover)] active:scale-95"
            >
              Shop Now
              <FiArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("shopCategory")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--text)] shadow-sm transition-all duration-200 hover:border-[var(--border-hover)] hover:bg-[var(--surface-secondary)] active:scale-95"
            >
              Explore Categories
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <FiCheck className="text-[var(--success)]" />
              Fast Delivery
            </div>

            <div className="flex items-center gap-2">
              <FiCheck className="text-[var(--success)]" />
              Easy Returns
            </div>

            <div className="flex items-center gap-2">
              <FiCheck className="text-[var(--success)]" />
              Premium Quality
            </div>
          </div>
        </div>

        {/* =========================
            RIGHT VISUAL
        ========================== */}

        <div className="relative hidden h-[500px] items-center justify-center lg:flex transition-colors duration-300">
       
          <div className="relative z-10 w-[360px] rounded-3xl border border-[var(--border)] bg-[var(--surface)]/70 p-4 shadow-[var(--shadow)] backdrop-blur-xl transition-colors duration-300">
            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-[var(--primary-light)] transition-colors duration-300">
              <div className="text-center">
                <div className="mb-4 flex justify-center  text-8xl">
                  <SiShopify className="text-9xl text-[var(--primary)] transition-colors duration-300" />
                </div>

                <p className="text-lg font-semibold text-[var(--text)] transition-colors duration-300">
                  Curated for you
                </p>

                <p className="mt-1 text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  Discover something amazing
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 pt-4">
              <div>
                <p className="text-sm font-semibold text-[var(--text)] transition-colors duration-300">
                  Premium Collection
                </p>

                <p className="mt-1 text-xs text-[var(--text-muted)] transition-colors duration-300">
                  New arrivals available
                </p>
              </div>

              <div className="rounded-full bg-[var(--primary-light)] px-3 py-1 text-xs font-medium text-[var(--primary)] transition-colors duration-300">
                New
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 z-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 px-5 py-4 shadow-[var(--shadow)] backdrop-blur-xl transition-colors duration-300">
            <p className="text-xs text-[var(--text-muted)] transition-colors duration-300">Happy customers</p>

            <p className="mt-1 text-xl font-bold text-[var(--text)] transition-colors duration-300">10K+</p>
          </div>

          <div className="absolute -right-4 -top-4 z-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 px-5 py-4 shadow-[var(--shadow)] backdrop-blur-xl transition-colors duration-300">
            <p className="text-xs text-[var(--text-muted)] transition-colors duration-300">Customer rating</p>

            <p className="mt-1 flex gap-1 items-center text-xl font-bold text-[var(--text)] transition-colors duration-300">
              <span> 4.9 </span>
              <FaStar className="text-amber-400" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
