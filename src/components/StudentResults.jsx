import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">📈 ළමයින් විසින් ලබාගත් ලකුණු ලැයිස්තුව</h3>
        <button 
          onClick={fetchStudentResults} 
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-200"
        >
          🔄 Refresh
        </button>
      </div>

      {resultsLoading ? (
        <p className="text-center py-6 text-gray-600">දත්ත පූරණය වෙමින් පවතී...</p>
      ) : resultsList.length === 0 ? (
        <p className="text-center py-6 text-gray-500">තවම කිසිදු ළමයෙක් ලකුණු යවා නැත.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="p-3">නම</th>
                <th className="p-3">ශ්‍රේණිය</th>
                <th className="p-3">පාඩම</th>
                <th className="p-3">ලකුණු</th>
              </tr>
            </thead>
            <tbody>
              {resultsList.map((res, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-800">{res.name}</td>
                  <td className="p-3">{res.grade} ශ්‍රේණිය</td>
                  <td className="p-3">{res.lesson}</td>
                  <td className="p-3 font-bold text-green-600">{res.score} / {res.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}