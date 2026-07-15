import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../../assets/images/Logo.png";

import {
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  UserRound,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
const { theme, toggleTheme } = useTheme();

const userLabel = !user
  ? "LOGIN"
  : user.role?.toLowerCase() === "admin"
    ? "ADMIN"
    : user.username || user.name || "CUSTOMER";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navLinkClass = ({ isActive }) =>
  `rounded-full px-6 py-1.5 text-base font-semibold transition ${
    isActive
      ? "bg-[var(--primary)] text-[var(--text-inverse)] shadow-md"
      : "text-[var(--text-secondary)] hover:bg-[var(--surface)] dark:hover:text-[var(--primary-hover)]"
  }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--navbar)]">
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/home" className="shrink-0">
          <img
            src={logo}
            alt="Koda Store"
            className="h-20 w-auto"
          />
        </Link>
        <nav className="hidden items-center rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] p-2 shadow-sm md:flex">
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Shop
          </NavLink>

          <NavLink to="/orders" className={navLinkClass}>
            My Orders
          </NavLink>

          <NavLink to="/wishlist" className={navLinkClass}>
            Wishlist
          </NavLink>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {showSearch ? (
            <div className="flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-4 shadow-sm">
              <Search
                size={18}
                className="text-[var(--text-muted)]"
              />

              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className="w-40 bg-transparent px-3 py-3 text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
              />

              <button
                type="button"
                onClick={() => setShowSearch(false)}
                aria-label="Close search"
                className="text-[var(--text-muted)] transition hover:text-[var(--text)]"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowSearch(true)}
              aria-label="Open search"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] shadow-sm transition hover:border-[var(--border-hover)] hover:bg-[var(--surface)] dark:hover:text-[var(--primary-hover)]"
            >
              <Search size={19} />
            </button>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--button-secondary)] text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:bg-[var(--surface)] dark:hover:text-[var(--primary-hover)]"
          >
            {theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

    
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] shadow-sm transition hover:border-[var(--border-hover)] hover:bg-[var(--surface)] dark:hover:text-[var(--primary-hover)]"
          >
            <Heart size={19} />
          </Link>

      
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] shadow-sm transition hover:border-[var(--border-hover)] hover:bg-[var(--surface)] dark:hover:text-[var(--primary-hover)]"
          >
            <ShoppingCart size={19} />

            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-bold text-[var(--text-inverse)]">
              0
            </span>
          </Link>

         {user ? (
       <Link to="/profile"
        className="flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-4 text-sm font-semibold text-[var(--text-secondary)] shadow-sm transition hover:text-[var(--primary)] hover:!bg-[var(--surface)]">
        <UserRound size={18} />
        {userLabel}
       </Link>
      ) : (
  <Link
    to="/login"
    className="flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-4 text-sm font-semibold text-[var(--text-secondary)] shadow-sm transition hover:text-[var(--primary)]"
  >
    <UserRound size={18} />
    LOGIN
  </Link>
)}
        </div>

  
        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--border-hover)] hover:bg-[var(--surface-secondary)] md:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--navbar)] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            <NavLink
              to="/home"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              Shop
            </NavLink>

            <NavLink
              to="/orders"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              My Orders
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              Wishlist
            </NavLink>
          </nav>

  
          <div className="mt-4 grid grid-cols-4 gap-2">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setShowSearch((current) => !current)}
              className="flex h-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:bg-[var(--surface-secondary)]"
            >
              <Search size={19} />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:bg-[var(--surface-secondary)]"
            >
              {theme === "dark" ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:bg-[var(--surface-secondary)]"
            >
              <Heart size={19} />
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              onClick={() => setIsMenuOpen(false)}
              className="relative flex h-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:bg-[var(--surface-secondary)]"
            >
              <ShoppingCart size={19} />

              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[9px] font-bold text-[var(--text-inverse)]">
                0
              </span>
            </Link>
          </div>


          {showSearch && (
            <div className="mt-4 flex items-center rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4">
              <Search
                size={18}
                className="text-[var(--text-muted)]"
              />

              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className="w-full bg-transparent px-3 py-3 text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
              />

              <button
                type="button"
                onClick={() => setShowSearch(false)}
                aria-label="Close search"
                className="text-[var(--text-muted)] transition hover:text-[var(--text)]"
              >
                <X size={18} />
              </button>
            </div>
          )}

    
          {user ? (
  <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
    <Link
      to="/profile"
      onClick={() => setIsMenuOpen(false)}
      className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]"
    >
      <UserRound size={18} />
      {userLabel}
    </Link>

    <button
      type="button"
      onClick={handleLogout}
      className="text-sm font-semibold text-[var(--danger)]"
    >
      Logout
    </button>
  </div>
) : (
  <Link
    to="/login"
    onClick={() => setIsMenuOpen(false)}
    className="mt-4 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
  >
    <UserRound size={18} />
    LOGIN
  </Link>
)}
        </div>
      )}
    </header>
  );
}