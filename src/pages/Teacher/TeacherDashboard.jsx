import { useNavigate } from 'react-router-dom';
import { HiOutlineDocumentAdd, HiOutlineChartBar, HiOutlineBookOpen } from 'react-icons/hi';

export default function TeacherDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {/* Welcome Section */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-[#ADDFF1]">
        <h1 className="text-2xl md:text-3xl font-bold text-[#003152]">ආයුබෝවන්! 👋</h1>
        <p className="text-[#003152]/80 mt-2 text-sm md:text-base">
          SmartMath පාලක පුවරුවට සාදරයෙන් පිළිගනිමු. 
        </p>
      </div>

      {/* Cards Grid - Fully Responsive for Mobile & Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Add Questions */}
        <div 
          onClick={() => navigate('/admin/add-questions')}
          className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-amber-500 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="bg-amber-50 p-4 rounded-full text-amber-600 mb-4 group-hover:scale-105 transition-transform duration-200">
            <HiOutlineDocumentAdd className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">ප්‍රශ්න එකතු කරන්න</h2>
          <p className="text-sm text-gray-500 flex-1">
            6 සිට 9 ශ්‍රේණිය දක්වා සියලුම ගණිත පාඩම් සඳහා බහුවරණ ගැටලු සැකසීම සහ කළමනාකරණය.
          </p>
          <div className="mt-5 text-amber-600 font-semibold text-sm flex items-center gap-1 group-hover:text-amber-800 transition-colors">
            පිවිසෙන්න <span className="text-lg">➔</span>
          </div>
        </div>

        {/* Card 2: Student Results */}
        <div 
          onClick={() => navigate('/admin/results')}
          className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-green-500 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="bg-green-50 p-4 rounded-full text-green-600 mb-4 group-hover:scale-105 transition-transform duration-200">
            <HiOutlineChartBar className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">ළමයින්ගේ ලකුණු වාර්තා</h2>
          <p className="text-sm text-gray-500 flex-1">
            සිසුන් විසින් ලබා දී ඇති පිළිතුරු සහ ලකුණු වාර්තා පරීක්ෂා කිරීම සහ විශ්ලේෂණය කිරීම.
          </p>
          <div className="mt-5 text-green-600 font-semibold text-sm flex items-center gap-1 group-hover:text-green-800 transition-colors">
            වාර්තා බලන්න <span className="text-lg">➔</span>
          </div>
        </div>

        {/* Card 3: Upload Materials */}
        <div 
          onClick={() => navigate('/admin/materials')}
          className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-blue-500 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="bg-blue-50 p-4 rounded-full text-blue-600 mb-4 group-hover:scale-105 transition-transform duration-200">
            <HiOutlineBookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">විෂය කරුණු ඇතුළත් කිරීම</h2>
          <p className="text-sm text-gray-500 flex-1">
            සිසුන් සඳහා අවශ්‍ය විෂය කරුණු, සටහන් සහ අධ්‍යාපනික නිබන්ධන PDF ලෙස උඩුගත කිරීම.
          </p>
          <div className="mt-5 text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:text-blue-800 transition-colors">
            අප්ලෝඩ් කරන්න <span className="text-lg">➔</span>
          </div>
        </div>

      </div>
    </div>
  );
}