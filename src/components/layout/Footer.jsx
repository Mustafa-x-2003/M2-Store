import {Globe, Heart, MessageCircle, Zap } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--navbar)] transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1360px] px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-3 md:gap-16">
          <div>
            <Link
              to="/home"
              className="inline-flex items-center gap-2 text-[var(--primary)] v"
            >
              <Zap size={28} strokeWidth={2.4} />

              <span className="text-2xl font-bold">
                M2-Store
              </span>
            </Link>

            <p className="mt-4 max-w-[340px] text-base leading-6 text-[var(--text-secondary)] transition-colors duration-300">
              Shop the future, delivered today. Premium products at the best
              prices with fast delivery across Egypt.
            </p>
          </div>

          <div className="md:justify-self-center">
            <h3 className="text-lg font-bold text-[var(--text)] transition-colors duration-300">
              Quick Links
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                to="/products"
                className="w-fit text-base text-[var(--text-secondary)] transition hover:text-[var(--primary)] transition-colors duration-300"
              >
                Shop
              </Link>

              <Link
                to="/orders"
                className="w-fit text-base text-[var(--text-secondary)] transition hover:text-[var(--primary)] transition-colors duration-300"
              >
                My Orders
              </Link>

              <Link
                to="/wishlist"
                className="w-fit text-base text-[var(--text-secondary)] transition hover:text-[var(--primary)] transition-colors duration-300"
              >
                Wishlist
              </Link>

              <Link
                to="/profile"
                className="w-fit text-base text-[var(--text-secondary)] transition hover:text-[var(--primary)] transition-colors duration-300"
              >
                Profile
              </Link>
            </nav>
          </div>

          <div className="md:justify-self-center">
            <h3 className="text-lg font-bold text-[var(--text)] transition-colors duration-300">
              Follow Us
            </h3>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="Website"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)]   hover:text-[var(--primary-hover)] transition-colors duration-300"
              >
                <Globe size={19} />
              </a>

              <a
                href="#"
                aria-label="Messages"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)]   hover:text-[var(--primary)] transition-colors duration-300"
              >
                <MessageCircle size={19} />
              </a>

              <a
                href="#"
                aria-label="Favorites"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)]   hover:text-[var(--primary)] transition-colors duration-300"
              >
                <Heart size={19} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-7 text-center transition-colors duration-300">
          <p className="text-m text-[var(--text-muted)]">
            © 2026 M2-Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}