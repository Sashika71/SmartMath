import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { HiOutlineRefresh } from 'react-icons/hi';

export default function StudentResults() {
  const [resultsList, setResultsList] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);

  useEffect(() => {
    fetchStudentResults();
  }, []);

  const fetchStudentResults = async () => {
    setResultsLoading(true);
    try {
      const q = query(collection(db, "student_results"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetched = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      setResultsList(fetched);
    } catch (error) {
      console.error("Error fetching results: ", error);
    }
    setResultsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto my-6 md:my-10 px-4 md:px-0">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 border-b pb-4 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            📈 ළමයින්ගේ ලකුණු වාර්තා
          </h2>
          <button 
            onClick={fetchStudentResults} 
            title="Refresh Data"
            className="bg-orange-50 text-amber-700 border border-amber-200 p-2.5 rounded-lg hover:bg-orange-100 transition-all flex items-center justify-center shadow-sm"
          >
            <HiOutlineRefresh className="w-5 h-5" />
          </button>
        </div>

        {resultsLoading ? (
          <p className="text-center py-10 text-amber-700 font-semibold animate-pulse">දත්ත පූරණය වෙමින් පවතී...</p>
        ) : resultsList.length === 0 ? (
          <p className="text-center py-10 text-gray-500">තවම කිසිදු ළමයෙක් ලකුණු යවා නැත.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-orange-100 shadow-sm">
            <table className="w-full border-collapse bg-white text-left">
              <thead>
                <tr className="bg-amber-700 text-white">
                  <th className="p-4 font-semibold whitespace-nowrap">නම</th>
                  <th className="p-4 font-semibold whitespace-nowrap">ශ්‍රේණිය</th>
                  <th className="p-4 font-semibold whitespace-nowrap">පාඩම</th>
                  <th className="p-4 font-semibold whitespace-nowrap">ලකුණු</th>
                </tr>
              </thead>
              <tbody>
                {resultsList.map((res, index) => (
                  <tr key={index} className="border-b border-orange-50 hover:bg-orange-50 transition-colors">
                    <td className="p-4 font-semibold text-gray-800">{res.name}</td>
                    <td className="p-4 text-gray-600">{res.grade} ශ්‍රේණිය</td>
                    <td className="p-4 text-gray-600">{res.lesson}</td>
                    <td className="p-4 font-bold text-emerald-600 bg-emerald-50/30">
                      {res.score} / {res.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}