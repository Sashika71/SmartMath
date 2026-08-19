import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isTeacherView = location.pathname.startsWith('/admin');
  const [menuOpen, setMenuOpen] = useState(false);

  if (location.pathname === '/admin-login') {
    return null;
  }

  const handleLogout = () => {
    // TODO: hook this up to actual Firebase Auth sign-out when auth is added
    navigate('/');
    setMenuOpen(false);
  };


 
  const links = isTeacherView
    ? [
        { label: "ප්‍රශ්න එකතු කරන්න", path: "/admin/add-questions", active: location.pathname === "/admin/add-questions" 
        }, 
        { label: "විෂය කරුණු ඇතුලත් කිරීම", path: "/admin/materials", active: location.pathname === "/admin/materials"},
        { label: "ළමයින්ගේ ලකුණු වාර්තා", path: "/admin/results", active: location.pathname === "/admin/results" }
      ]
    : [
        { label: "විෂය මාලාව", path: "/", active: false },
        { label: "ප්‍රශ්නමාලාව", path: "/", active: true }
      ];

  return (
    <header className="bg-orange-50 border-b border-orange-100 relative">
      <div className="px-4 md:px-8 py-3 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
        <div className="flex items-center gap-2">
          {/* Hamburger toggle - mobile only, left corner */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-amber-800 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-0.5 bg-amber-800 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-amber-800 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
          <span className="text-base md:text-lg font-extrabold text-amber-800">MathsHub</span>
        </div>

        {/* Desktop nav links - centered, hidden on mobile */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`text-sm font-semibold whitespace-nowrap ${
                link.active
                  ? "text-amber-700 border-b-2 border-amber-700 pb-1"
                  : "text-amber-900 hover:text-amber-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: main action button always visible */}
        <div className="flex items-center gap-2 md:justify-end">
          {isTeacherView ? (
            <button
              onClick={handleLogout}
              className="hidden md:inline-block text-sm font-semibold text-amber-900 hover:text-amber-700 border border-amber-300 px-3 py-1.5 rounded-full transition-all whitespace-nowrap"
            >
              🚪 ඉවත් වන්න
            </button>
          ) : (
            <Link
              to="/admin"
              className="hidden md:inline-block bg-amber-800 hover:bg-amber-900 text-white text-sm font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap"
            >
              👨‍🏫 ගුරු පිවිසුම
            </Link>
          )}

          {/* Mobile-only: compact main action button */}
          {isTeacherView ? (
            <button
              onClick={handleLogout}
              className="md:hidden text-xs font-semibold text-amber-900 hover:text-amber-700 border border-amber-300 px-2.5 py-1 rounded-full transition-all whitespace-nowrap"
            >
              🚪 ඉවත් වන්න
            </button>
          ) : (
            <Link
              to="/admin"
              className="md:hidden bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all whitespace-nowrap"
            >
              👨‍🏫 ගුරු පිවිසුම
            </Link>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-orange-50 border-t border-orange-100 px-4 py-3 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-semibold ${
                link.active ? "text-amber-700" : "text-amber-900 hover:text-amber-700"
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