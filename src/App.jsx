import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isTeacherView = location.pathname.startsWith('/admin');
  
  // Mobile Menu එක open/close කිරීම සඳහා State එක
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // TODO: hook this up to actual Firebase Auth sign-out when auth is added
    navigate('/');
  };

  return (
    <header className="bg-orange-50 border-b border-orange-100 px-4 md:px-8 py-3">
      {isTeacherView ? (
        // ---------------- TEACHER VIEW HEADER ----------------
        <div className="flex items-center justify-between w-full">
          <div className="flex-1">
            <span className="text-lg font-extrabold text-amber-800">MathsHub</span>
          </div>
          <nav className="flex items-center justify-end gap-2 md:gap-4 flex-1">
            <button className="bg-amber-800 hover:bg-amber-900 text-white text-[11px] md:text-sm font-bold px-3 py-1.5 rounded-full transition-all whitespace-nowrap">
              පාඩමක් සාදන්න
            </button>
            <button
              onClick={handleLogout}
              className="text-[11px] md:text-sm font-semibold text-amber-900 hover:text-amber-700 border border-amber-300 px-2 py-1.5 rounded-full transition-all whitespace-nowrap"
            >
              🚪 ඉවත් වන්න
            </button>
          </nav>
        </div>
      ) : (
        // ---------------- STUDENT VIEW HEADER ----------------
        <div>
          <div className="flex items-center justify-between w-full">
            
            {/* වම් පස: Hamburger Menu Icon (Mobile සඳහා පමණි) */}
            <div className="md:hidden flex-1 flex justify-start">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-amber-800 p-1 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    // Close (X) Icon
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    // Hamburger (ඉරි තුන) Icon
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* මැද: App Name (Mobile වල මැද, Desktop වල වම් පස) */}
            <div className="flex-1 md:flex-none text-center md:text-left">
              <span className="text-lg font-extrabold text-amber-800">MathsHub</span>
            </div>

            {/* Desktop Navigation (Mobile වලදී මෙය සැඟවෙයි) */}
            <nav className="hidden md:flex flex-1 justify-center gap-6">
              <a href="#" className="text-sm font-semibold text-amber-900 hover:text-amber-700">
                විෂය මාලාව
              </a>
              <a href="#" className="text-sm font-semibold text-amber-700 border-b-2 border-amber-700 pb-1">
                ප්‍රශ්නමාලාව
              </a>
            </nav>

            {/* දකුණු පස: ගුරු පිවිසුම (Right aligned) */}
            <div className="flex-1 md:flex-none flex justify-end">
              <Link
                to="/admin"
                className="bg-amber-800 hover:bg-amber-900 text-white text-[11px] md:text-sm font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 whitespace-nowrap"
              >
                <span className="hidden sm:inline">👨‍🏫</span> ගුරු පිවිසුම
              </Link>
            </div>
          </div>

          {/* Mobile Menu Dropdown (Hamburger එක click කළ විට පෙනේ) */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-3 pt-3 border-t border-orange-200 flex flex-col items-start pl-4 gap-4 animate-fade-in">
              <a href="#" className="text-sm font-semibold text-amber-900 hover:text-amber-700">
                විෂය මාලාව
              </a>
              <a href="#" className="text-sm font-semibold text-amber-700 border-b-2 border-amber-700 pb-1 inline-block">
                ප්‍රශ්නමාලාව
              </a>
            </nav>
          )}
        </div>
      )}
    </header>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sinhala">
        <Header />
        <div className="p-4 md:p-8">
          <Routes>
            <Route path="/" element={<StudentPage />} />
            <Route path="/admin" element={<TeacherPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}