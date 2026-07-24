import { useEffect, useState } from "react";
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

import { getCart } from "../../features/cart/services/cartApi";
import { getWishlist } from "../../features/Wishlist/services/wishlistApi";

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

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchCounts = async () => {
      if (!user) {
        setCartCount(0);
        setWishlistCount(0);
        return;
      }

      try {
        const cartResponse = await getCart();

        const items = cartResponse.data?.items || [];

        const totalQuantity = items.reduce(
          (total, item) => total + (item.quantity || 0),
          0,
        );

        setCartCount(totalQuantity);
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
        setCartCount(0);
      }

      try {
        const wishlistResponse = await getWishlist();

        setWishlistCount(
          wishlistResponse.data?.totalProducts ??
            wishlistResponse.data?.products?.length ??
            0,
        );
      } catch (error) {
        console.error("Failed to fetch wishlist count:", error);
        setWishlistCount(0);
      }
    };

    fetchCounts();

    window.addEventListener("navbar-counts-update", fetchCounts);

    return () => {
      window.removeEventListener("navbar-counts-update", fetchCounts);
    };
  }, [user]);

  const navLinkClass = ({ isActive }) =>
    `whitespace-nowrap rounded-full px-6 py-1.5 text-base font-semibold transition ${
      isActive
        ? "bg-[var(--primary)] text-[var(--text-inverse)] shadow-md"
        : "text-[var(--text-secondary)] hover:bg-[var(--surface)] dark:hover:text-[var(--primary-hover)]"
    }`;

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      navigate(`/Shop?search=${encodeURIComponent(e.target.value)}`);
      setShowSearch(false);
    }
  };

  return (
    <header className=" fixed top-0  z-1000 w-full ">
      <div className=" fixed top-0 z-999  border-b border-[var(--border)]  bg-[var(--navbar)]   flex h-20 w-full items-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <Link to="/home" className="shrink-0">
          <img
            src={logo}
            alt="M2 Store"
            className="h-10 w-auto object-contain min-[780px]:h-16"
          />
        </Link>

        <div className="hidden flex-1 justify-center min-[780px]:flex">
          <nav className="flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] p-2 shadow-sm transition-colors duration-300">
            <NavLink to="/home" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/Shop" className={navLinkClass}>
              Shop
            </NavLink>

            <NavLink to="/orders" className={navLinkClass}>
              My Orders
            </NavLink>

            <NavLink to="/wishlist" className={navLinkClass}>
              Wishlist
            </NavLink>
          </nav>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 min-[780px]:gap-2">
          <div
            className={`hidden ${showSearch ? "    min-[780px]:flex" : "items-center rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] pl-4 shadow-sm min-[780px]:flex"} border-2 border-[var(--border)] rounded-full transition-all duration-300`}
          >
            {showSearch ? (
              ""
            ) : (
              <Search
                size={18}
                className="text-[var(--text-muted)] transition-colors duration-300"
              />
            )}

            <input
              type="text"
              placeholder="Search..."
              autoFocus
              onKeyDown={(e) => {
                handleSearch(e);
              }}
              className={`${showSearch ? "w-0" : "w-40 bg-transparent pl-3  text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"}  transition-all duration-300`}
            />

            {showSearch ? (
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                aria-label="Open search"
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)]  hover:bg-[var(--surface)] dark:hover:text-[var(--primary-hover)] min-[780px]:flex "
              >
                <Search size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSearch(true)}
                aria-label="Close search"
                className="hidden h-9 w-9 shrink-0 items-center  justify-center rounded-full  bg-[var(--surface-secondary)] text-[var(--text-secondary)]   hover:bg-[var(--surface)] dark:hover:text-[var(--primary-hover)] min-[780px]:flex "
              >
                <X size={18} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--button-secondary)] text-[var(--text-secondary)] shadow-sm transition hover:border-[var(--border-hover)] hover:bg-[var(--surface)] dark:hover:text-[var(--primary-hover)] transition-colors duration-300"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] shadow-sm transition hover:border-[var(--border-hover)] hover:bg-[var(--surface)] dark:hover:text-[var(--primary-hover)] transition-colors duration-300"
          >
            <Heart size={18} />

            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-bold text-[var(--text-inverse)] transition-colors duration-300">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] shadow-sm transition hover:border-[var(--border-hover)] hover:bg-[var(--surface)] dark:hover:text-[var(--primary-hover)] transition-colors duration-300"
          >
            <ShoppingCart size={18} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-bold text-[var(--text-inverse)] transition-colors duration-300">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <Link
              to="/profile"
              className="hidden h-11 items-center gap-2 rounded-full border-2 border-[var(--border)] bg-[var(--surface-secondary)] px-4 text-sm font-semibold text-[var(--text-secondary)] shadow-sm transition hover:bg-[var(--surface)] hover:text-[var(--primary)] min-[780px]:flex transition-colors duration-300"
            >
              <UserRound size={18} />
              {userLabel}
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-4 text-sm font-semibold text-[var(--text-secondary)] shadow-sm transition hover:bg-[var(--surface)] hover:text-[var(--primary)] min-[780px]:flex transition-colors duration-300"
            >
              <UserRound size={18} />
              LOGIN
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-sm transition hover:border-[var(--border-hover)] hover:bg-[var(--surface-secondary)] min-[780px]:hidden"
          >
            {isMenuOpen ? <X size={22} /> :  <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed w-full ${isMenuOpen ? "top-20" : "-top-80 "}    border-t border-[var(--border)] bg-[var(--navbar)] px-4 py-4 min-[780px]:hidden transition-all duration-300`}
      >
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

        <div className="mt-4 flex items-center rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4">
          <Search size={18} className="shrink-0 text-[var(--text-muted)]" />

          <input
            type="text"
            placeholder="Search..."
            autoFocus
            onKeyDown={handleSearch}
            className="w-full bg-transparent px-3 py-3 text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>

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
    </header>
  );
}
