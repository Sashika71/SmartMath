import { useState } from 'react';
import { db } from '../firebase';
import { HiChevronLeft } from "react-icons/hi";
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const lessonsData = {
  "6": ["සංඛ්‍යා රේඛාව", "භාග", "දශම", "කෝණ", "සමමිතිකතාව"],
  "7": ["සමීකරණ", "ප්‍රතිශත", "වර්ගඵලය", "පරිමිතිය", "අනුපාත"],
  "8": ["වීජීය ප්‍රකාශන", "ප්‍රස්තාර", "ඝන වස්තු", "සම්භාවිතාව", "දර්ශක"],
  "9": ["වර්ගමූලය", "ත්‍රිකෝණමිතිය", "සමාන්තර ශ්‍රේණි", "ලඝුගණක", "කුලක"]
};

// Icon + color per grade, matching the reference UI (peach cards, colored icon badges)
const gradeMeta = {
  "6": { icon: "🧮", color: "text-orange-500" },
  "7": { icon: "📐", color: "text-orange-500" },
  "8": { icon: "Σ", color: "text-orange-500" },
  "9": { icon: "𝑓", color: "text-orange-500" }
};

export default function StudentPage() {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');
  const [questionsList, setQuestionsList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [studentLoading, setStudentLoading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const fetchQuestionsForStudent = async (targetGrade, targetLesson) => {
    setStudentLoading(true);
    try {
      const q = query(
        collection(db, "questions"),
        where("grade", "==", targetGrade),
        where("lesson", "==", targetLesson)
      );
      const querySnapshot = await getDocs(q);
      const fetched = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      setQuestionsList(fetched);
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowScore(false);
      setIsSaved(false);
      setStudentName('');
    } catch (error) {
      console.error("Error fetching questions: ", error);
    }
    setStudentLoading(false);
  };

  const handleAnswerClick = (selectedOption) => {
    const currentQ = questionsList[currentQuestionIndex];
    if (selectedOption === currentQ.correct) {
      setScore(score + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questionsList.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowScore(true);
    }
  };

  const handleSaveResult = async (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert("කරුණාකර ඔබේ නම ඇතුළත් කරන්න!");
      return;
    }

    try {
      await addDoc(collection(db, 'student_results'), {
        name: studentName,
        grade: selectedGrade,
        lesson: selectedLesson,
        score: score,
        total: questionsList.length,
        createdAt: new Date()
      });
      setIsSaved(true);
      alert("ඔබේ ලකුණු සාර්ථකව ගුරුවරයා වෙත යැව්වා! 🎉");
    } catch (error) {
      console.error("Error saving result: ", error);
      alert("ලකුණු යැවීමේදී දෝෂයක් ඇති විය.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">

          {!selectedGrade ? (
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-2">
                ගණිත ගැටලු <br /> විසඳමු
              </h1>
              <p className="text-center text-gray-500 mb-8 text-sm">
                පුහුණුවීම් ආරම්භ කිරීමට ඔබේ ශ්‍රේණිය තෝරන්න.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["6", "7", "8", "9"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className="flex flex-col items-center justify-center gap-3 bg-orange-50 hover:bg-orange-100 border border-orange-100 rounded-2xl py-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <span className={`text-3xl font-bold ${gradeMeta[g].color}`}>
                      {gradeMeta[g].icon}
                    </span>
                    <span className="font-bold text-gray-700">{g} ශ්‍රේණිය</span>
                  </button>
                ))}
              </div>
            </div>
          ) : !selectedLesson ? (
            <div>
              <button 
                onClick={() => setSelectedGrade('')} 
                className="text-amber-800 hover:text-amber-900 mb-4 p-2 -ml-2 rounded-full hover:bg-orange-50 transition-all focus:outline-none flex items-center justify-center"
                aria-label="ආපසු යන්න"
              >
               
                <HiChevronLeft className="w-8 h-8" />
              </button>
              
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {selectedGrade} ශ්‍රේණියට අදාළ පාඩම තෝරන්න
              </h2>
              <div className="space-y-2">
                {lessonsData[selectedGrade].map((les, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedLesson(les);
                      fetchQuestionsForStudent(selectedGrade, les);
                    }}
                    className="w-full text-left bg-orange-50 border border-orange-100 p-4 rounded-xl font-semibold text-gray-700 hover:bg-orange-100 hover:border-orange-300 transition-all"
                  >
                    📚 {les}
                  </button>
                ))}
              </div>
            </div>
          ) : studentLoading ? (
            <p className="text-center py-8 text-gray-600">ප්‍රශ්න පූරණය වෙමින් පවතී...</p>
          ) : questionsList.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-red-600 font-semibold mb-4">මෙම පාඩමට තවම ප්‍රශ්න ඇතුළත් කර නැත!</p>
              <button
                onClick={() => setSelectedLesson('')}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                වෙනත් පාඩමක් තෝරන්න
              </button>
            </div>
          ) : showScore ? (
            <div className="text-center py-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">සුභ පැතුම්! 🎉</h3>
              <p className="text-lg text-gray-600 mb-4">
                ඔබ ලබාගත් ලකුණු: <span className="font-bold text-orange-600">{score} / {questionsList.length}</span>
              </p>

              {!isSaved ? (
                <form onSubmit={handleSaveResult} className="bg-orange-50 p-4 rounded-xl border border-orange-100 space-y-3 mt-4">
                  <label className="block text-gray-700 font-semibold text-sm">
                    ගුරුවරයාට පෙන්වීම සඳහා ඔබේ නම ඇතුළත් කරන්න:
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="උදා: ඉසුරු පෙරේරා"
                    className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all"
                  >
                    ගුරුවරයාට ලකුණු යවන්න 📤
                  </button>
                </form>
              ) : (
                <div className="mt-4">
                  <p className="text-green-700 font-semibold mb-4">✅ ඔබේ ලකුණු සාර්ථකව සේව් විය!</p>
                  <button
                    onClick={() => { setSelectedLesson(''); setQuestionsList([]); }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
                  >
                    වෙනත් පාඩමකට යන්න
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4 text-sm text-gray-500 border-b pb-2">
                <span>පාඩම: {selectedLesson}</span>
                <span>ප්‍රශ්නය: {currentQuestionIndex + 1} / {questionsList.length}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {questionsList[currentQuestionIndex].text}
              </h3>
              <div className="space-y-3">
                {questionsList[currentQuestionIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerClick(opt)}
                    className="w-full text-left bg-gray-50 border-2 border-gray-200 p-4 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-500 transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}