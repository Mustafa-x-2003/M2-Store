import { Outlet } from "react-router";

import Navbar from "../components/layout/Navbar";

import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--text)] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 bg-[var(--surface-secondary)] transition-colors duration-300">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
