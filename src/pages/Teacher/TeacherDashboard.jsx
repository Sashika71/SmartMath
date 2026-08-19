import { useNavigate } from 'react-router-dom';
import { HiOutlineDocumentAdd, HiOutlineChartBar, HiOutlineBookOpen } from 'react-icons/hi';

export default function TeacherDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">ආයුබෝවන්! 👋</h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          MathsHub පාලක පුවරුවට සාදරයෙන් පිළිගනිමු. අද දවසේ පන්ති කාමරයේ තත්ත්වය සහ කළමනාකරණ කටයුතු පහතින් තෝරන්න.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Add Questions */}
        <div 
        //   onClick={() => navigate('/admin/add-questions')}
          className="bg-white rounded-xl p-6 shadow-md border-t-4 border-amber-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="bg-amber-50 p-4 rounded-full text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-300">
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
        //   onClick={() => navigate('/admin/marks')}
          className="bg-white rounded-xl p-6 shadow-md border-t-4 border-green-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="bg-green-50 p-4 rounded-full text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
            <HiOutlineChartBar className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">ළමයින්ගේ ලකුණු</h2>
          <p className="text-sm text-gray-500 flex-1">
            අද දින පිළිතුරු සැපයූ ළමුන්: <span className="font-bold text-green-600">5ක්</span>
          </p>
          <div className="mt-5 text-green-600 font-semibold text-sm flex items-center gap-1 group-hover:text-green-800 transition-colors">
            වාර්තා බලන්න <span className="text-lg">➔</span>
          </div>
        </div>

        {/* Card 3: Upload Materials (PDFs) */}
        <div 
        //   onClick={() => navigate('/admin/materials')}
          className="bg-white rounded-xl p-6 shadow-md border-t-4 border-blue-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="bg-blue-50 p-4 rounded-full text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
            <HiOutlineBookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">නිබන්ධන එකතු කරන්න</h2>
          <p className="text-sm text-gray-500 flex-1">
            අවසන් වරට PDF යාවත්කාලීන කළේ: <span className="font-bold text-blue-600">ඊයේ</span>
          </p>
          <div className="mt-5 text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:text-blue-800 transition-colors">
            අප්ලෝඩ් කරන්න <span className="text-lg">➔</span>
          </div>
        </div>

      </div>
    </div>
  );
}