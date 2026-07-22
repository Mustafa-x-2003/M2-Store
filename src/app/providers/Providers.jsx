import { ThemeProvider } from "../../context/ThemeContext";
import { AuthProvider } from "../../context/AuthContext";
import { WishlistProvider } from "../../features/Wishlist/context/WishlistContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}