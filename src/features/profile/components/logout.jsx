import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext"; 

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm 
      font-bold text-white transition hover:opacity-90 cursor-pointer">
      <LogOut size={18} /> Logout </button>
  );
}