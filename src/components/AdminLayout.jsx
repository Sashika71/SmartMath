import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import { HiOutlineDocumentAdd, HiOutlineChartBar, HiOutlineBookOpen, HiHome, HiLogout, HiMenu, HiX } from 'react-icons/hi';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout දෝෂයක් මතු විය: ", error);
    }
  };

  const menuItems = [
    { label: "පාලක පුවරුව (Dashboard)", path: "/admin", icon: <HiHome className="w-5 h-5" /> },
    { label: "ප්‍රශ්න එකතු කරන්න", path: "/admin/add-questions", icon: <HiOutlineDocumentAdd className="w-5 h-5" /> },
    { label: "විෂය කරුණු ඇතුළත් කිරීම", path: "/admin/materials", icon: <HiOutlineBookOpen className="w-5 h-5" /> },
    { label: "ළමයින්ගේ ලකුණු වාර්තා", path: "/admin/results", icon: <HiOutlineChartBar className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* 1. Mobile Top Bar (මොබයිල් එකේදී පමණක් උඩින් පෙන්වන Header එක) */}
      <div className="md:hidden bg-white border-b border-[#ADDFF1] px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 rounded-lg text-[#003152] hover:bg-gray-100 focus:outline-none"
            aria-label="Open Menu"
          >
            <HiMenu className="w-6 h-6" />
          </button>
          <span className="text-lg font-extrabold text-[#003152]">MathsHub</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
        >
          <HiLogout className="w-4 h-4" />
          ඉවත් වන්න
        </button>
      </div>

      {/* 2. Mobile Sidebar Overlay & Drawer (මොබයිල් එකේ මෙනුව ක්ලික් කළ විට පාවී එන කොටස) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <aside className="relative w-72 bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-8 px-2">
                <div>
                  <h1 className="text-xl font-extrabold text-[#003152]">MathsHub</h1>
                  <p className="text-xs text-gray-500 mt-0.5">ගුරු කළමනාකරණ පද්ධතිය</p>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                        isActive
                          ? "bg-[#003152] text-white shadow-md"
                          : "text-gray-600 hover:bg-[#ADDFF1]/20 hover:text-[#003152]"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-gray-100 mt-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 font-semibold px-4 py-3 rounded-xl transition-all text-sm cursor-pointer"
              >
                <HiLogout className="w-5 h-5" />
                ඉවත් වන්න
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 3. Desktop Sidebar (ඩෙස්ක්ටොප් එකේදී වම්පස ස්ථාවරව පවතින කොටස) */}
      <aside className="hidden md:flex w-72 bg-white border-r border-[#ADDFF1] flex-col justify-between p-6 shadow-sm sticky top-0 h-screen overflow-y-auto">
        <div>
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-extrabold text-[#003152]">MathsHub</h1>
            <p className="text-sm text-gray-500 mt-1">ගුරු කළමනාකරණ පද්ධතිය</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    isActive
                      ? "bg-[#003152] text-white shadow-md"
                      : "text-gray-600 hover:bg-[#ADDFF1]/20 hover:text-[#003152]"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-100 mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 font-semibold px-4 py-3 rounded-xl transition-all text-sm cursor-pointer"
          >
            <HiLogout className="w-5 h-5" />
            ඉවත් වන්න
          </button>
        </div>
      </aside>

      {/* 4. Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
}