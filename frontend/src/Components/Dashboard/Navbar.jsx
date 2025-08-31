import React, { useState } from "react";
import { Menu, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onToggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication (e.g., token)
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/signin");
  };

  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Left: Hamburger for mobile */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          NoteApp
        </h1>
      </div>

      {/* Right: Profile */}
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md cursor-pointer"
        >
          <User className="w-5 h-5" />
        </button>

        {openDropdown && (
          <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-2 animate-fadeIn">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
