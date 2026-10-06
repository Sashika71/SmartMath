import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InstallPWA from './InstallPWA';

export default function Header() {
  const location = useLocation();
  const isTeacherView = location.pathname.startsWith('/admin');
  const [menuOpen, setMenuOpen] = useState(false);

  if (location.pathname === '/admin-login' || isTeacherView) {
    return null;
  }

  const links = [
    { label: "විෂය මාලාව", path: "/", active: false, id: "nav-curriculum" },
    { label: "ප්‍රශ්නමාලාව", path: "/", active: true, id: "nav-questions" }
  ];

  return (
    <header className="bg-[#ADDFF1]/25 border-b border-[#ADDFF1] w-full relative z-50">
      <div className="w-full px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[#003152] transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#003152] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#003152] transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
          <span className="text-base sm:text-2xl font-extrabold text-[#003152] tracking-tight">SmartMath</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              id={link.id}
              to={link.path}
              className={`text-lg font-semibold whitespace-nowrap ${
                link.active
                  ? "text-[#003152] border-b-2 border-[#003152] pb-0.5"
                  : "text-[#003152]/80 hover:text-[#003152]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <InstallPWA />
          <Link
            id="teacher-login-btn"
            to="/admin-login"
            className="bg-[#003152] hover:bg-[#003152]/90 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap shadow-sm"
          >
            👨‍🏫 ගුරු පිවිසුම
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-dropdown-menu" className="md:hidden absolute top-full left-0 w-7/12 sm:w-1/2 bg-white border-b border-r border-[#ADDFF1] shadow-md p-3 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.label}
              id={`mobile-${link.id}`}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-semibold py-2 px-3 transition-colors ${
                link.active ? "bg-[#ADDFF1]/30 text-[#003152]" : "text-gray-700 hover:bg-gray-50 hover:text-[#003152]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}