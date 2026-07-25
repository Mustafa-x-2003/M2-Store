import { ThemeProvider } from "../../context/ThemeContext";
import { AuthProvider } from "../../context/AuthContext";
import { WishlistProvider } from "../../features/Wishlist/context/WishlistContext";
import { CartProvider } from "../../features/cart/context/CartContext";
export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}