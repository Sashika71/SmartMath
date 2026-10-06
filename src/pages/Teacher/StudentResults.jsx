import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { HiInformationCircle } from 'react-icons/hi';

const lessonsData = {
  "6": ["සංඛ්‍යා රේඛාව", "භාග", "දශම", "කෝණ", "සමමිතිකතාව"],
  "7": ["සමීකරණ", "ප්‍රතිශත", "වර්ගඵලය", "පරිමිතිය", "අනුපාත"],
  "8": ["වීජීය ප්‍රකාශන", "ප්‍රස්තාර", "ඝන වස්තු", "සම්භාවිතාව", "දර්ශක"],
  "9": ["වර්ගමූලය", "ත්‍රිකෝණමිතිය", "සමාන්තර ශ්‍රේණි", "ලඝුගණක", "කුලක"]
};

export default function StudentResults() {
  const [resultsList, setResultsList] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [filterGrade, setFilterGrade] = useState('');
  const [filterLesson, setFilterLesson] = useState('');

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

  const filteredResults = resultsList.filter((res) => {
    return res.grade === filterGrade && res.lesson === filterLesson;
  });

  return (
    <div className="max-w-4xl mx-auto my-6 md:my-10 px-4 md:px-0">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-[#ADDFF1]">
        <div className="mb-6 border-b border-[#ADDFF1] pb-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#003152]">
            📈 ළමයින්ගේ ලකුණු වාර්තා
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-[#003152] mb-1.5">ශ්‍රේණිය</label>
            <select
              id="filter-grade-select"
              value={filterGrade}
              onChange={(e) => {
                setFilterGrade(e.target.value);
                setFilterLesson('');
              }}
              className="w-full border border-[#ADDFF1] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#003152] text-sm bg-gray-50 font-medium"
            >
              <option value="">ශ්‍රේණියක් තෝරන්න</option>
              <option value="6">6 ශ්‍රේණිය</option>
              <option value="7">7 ශ්‍රේණිය</option>
              <option value="8">8 ශ්‍රේණිය</option>
              <option value="9">9 ශ්‍රේණිය</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#003152] mb-1.5">පාඩම</label>
            <select
              id="filter-lesson-select"
              value={filterLesson}
              onChange={(e) => setFilterLesson(e.target.value)}
              disabled={!filterGrade}
              className="w-full border border-[#ADDFF1] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#003152] text-sm bg-gray-50 font-medium disabled:opacity-50"
            >
              <option value="">පාඩමක් තෝරන්න</option>
              {filterGrade && lessonsData[filterGrade]?.map((les, idx) => (
                <option key={idx} value={les}>{les}</option>
              ))}
            </select>
          </div>
        </div>

        {!filterGrade || !filterLesson ? (
          <div id="results-info-box" className="text-center py-12 bg-[#ADDFF1]/10 rounded-2xl border border-dashed border-[#ADDFF1] flex flex-col items-center justify-center gap-2 px-4">
            <HiInformationCircle className="w-8 h-8 text-[#003152]" />
            <p className="text-[#003152] font-semibold text-sm">
              සිසුන්ගේ ලකුණු වාර්තා බැලීම සඳහා ඉහතින් ශ්‍රේණිය සහ පාඩම තෝරන්න.
            </p>
          </div>
        ) : resultsLoading ? (
          <p className="text-center py-10 text-[#003152] font-semibold animate-pulse">දත්ත පූරණය වෙමින් පවතී...</p>
        ) : filteredResults.length === 0 ? (
          <p id="no-results-msg" className="text-center py-10 text-gray-500">මෙම පාඩම සඳහා තවම කිසිදු ළමයෙක් ලකුණු යවා නැත.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#ADDFF1] shadow-sm">
            <table id="results-table" className="w-full border-collapse bg-white text-left text-sm md:text-base">
              <thead>
                <tr className="bg-[#003152] text-white">
                  <th className="p-3.5 md:p-4 font-semibold whitespace-nowrap">නම</th>
                  <th className="p-3.5 md:p-4 font-semibold whitespace-nowrap">ශ්‍රේණිය</th>
                  <th className="p-3.5 md:p-4 font-semibold whitespace-nowrap">පාඩම</th>
                  <th className="p-3.5 md:p-4 font-semibold whitespace-nowrap">ලකුණු</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((res, index) => (
                  <tr key={index} className="border-b border-[#ADDFF1]/30 hover:bg-[#ADDFF1]/20 transition-colors">
                    <td className="p-3.5 md:p-4 font-semibold text-gray-800">{res.name}</td>
                    <td className="p-3.5 md:p-4 text-gray-600 whitespace-nowrap">{res.grade} ශ්‍රේණිය</td>
                    <td className="p-3.5 md:p-4 text-gray-600">{res.lesson}</td>
                    <td className="p-3.5 md:p-4 font-bold text-emerald-600 bg-emerald-50/30 whitespace-nowrap">
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