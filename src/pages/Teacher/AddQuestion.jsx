import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const lessonsData = {
  "6": ["සංඛ්‍යා රේඛාව", "භාග", "දශම", "කෝණ", "සමමිතිකතාව"],
  "7": ["සමීකරණ", "ප්‍රතිශත", "වර්ගඵලය", "පරිමිතිය", "අනුපාත"],
  "8": ["වීජීය ප්‍රකාශන", "ප්‍රස්තාර", "ඝන වස්තු", "සම්භාවිතාව", "දර්ශක"],
  "9": ["වර්ගමූලය", "ත්‍රිකෝණමිතිය", "සමාන්තර ශ්‍රේණි", "ලඝුගණක", "කුලක"]
};

export default function AddQuestion() {
  const [grade, setGrade] = useState('');
  const [lesson, setLesson] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
    setLesson('');
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    if (!grade || !lesson || !questionText || !opt1 || !opt2 || !opt3 || !opt4 || !correctAnswer) {
      alert("කරුණාකර සියලුම කොටස් පුරවන්න!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'questions'), {
        grade: grade,
        lesson: lesson,
        text: questionText,
        options: [opt1, opt2, opt3, opt4],
        correct: correctAnswer,
        createdAt: new Date()
      });

      alert("ප්‍රශ්නය සාර්ථකව දත්ත ගබඩාවට එකතු කළා! 🎉");
      setQuestionText(''); setOpt1(''); setOpt2(''); setOpt3(''); setOpt4(''); setCorrectAnswer('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("දෝෂයක්! Firebase සම්බන්ධතාවය පරීක්ෂා කරන්න.");
    }
    setLoading(false);
  };

  return (
    // වටේට ඉඩ (Space) තැබීම සහ ෆෝම් එක මැදට ගැනීම (max-w-4xl mx-auto my-6 md:my-10)
    <div className="max-w-5xl mx-auto my-5 md:my-5 px-4 md:px-0">
      
      {/* සුදු පාට පසුබිම සහ Card පෙනුම */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        
        {/* ෆෝම් එකේ මාතෘකාව (අවශ්‍ය නම් පමණක් තියාගන්න) */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          නව ප්‍රශ්නයක් ඇතුළත් කිරීම
        </h2>

        {/* ඔයාගේ මුල් ෆෝම් එක කිසිම වෙනසක් නොකර මෙතන ඇතුළත් කර ඇත */}
        <form onSubmit={handleSaveQuestion} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-orange-50 p-4 rounded-xl border border-orange-100">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">ශ්‍රේණිය (Grade):</label>
              <select
                value={grade}
                onChange={handleGradeChange}
                className="w-full border border-orange-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              >
                <option value="">-- තෝරන්න --</option>
                <option value="6">6 ශ්‍රේණිය</option>
                <option value="7">7 ශ්‍රේණිය</option>
                <option value="8">8 ශ්‍රේණිය</option>
                <option value="9">9 ශ්‍රේණිය</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">පාඩමේ නම (Lesson):</label>
              <select
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                disabled={!grade}
                className="w-full border border-orange-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-400 bg-white disabled:bg-gray-200"
              >
                <option value="">-- පාඩම තෝරන්න --</option>
                {grade && lessonsData[grade].map((lessonName, index) => (
                  <option key={index} value={lessonName}>{lessonName}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">ගැටලුව (Question):</label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
              placeholder="උදා: 2x + 5 = 15 නම්, x හි අගය සොයන්න."
              rows="3"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">පිළිතුර 1:</label>
              <input type="text" value={opt1} onChange={(e) => setOpt1(e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">පිළිතුර 2:</label>
              <input type="text" value={opt2} onChange={(e) => setOpt2(e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">පිළිතුර 3:</label>
              <input type="text" value={opt3} onChange={(e) => setOpt3(e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">පිළිතුර 4:</label>
              <input type="text" value={opt4} onChange={(e) => setOpt4(e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <label className="block text-amber-800 font-semibold mb-2">නිවැරදි පිළිතුර කුමක්ද?</label>
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full border border-orange-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            >
              <option value="">-- තෝරන්න --</option>
              {opt1 && <option value={opt1}>{opt1}</option>}
              {opt2 && <option value={opt2}>{opt2}</option>}
              {opt3 && <option value={opt3}>{opt3}</option>}
              {opt4 && <option value={opt4}>{opt4}</option>}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-800 text-white font-bold text-lg py-4 rounded-lg hover:bg-amber-900 transition-all shadow-md disabled:bg-gray-400"
          >
            {loading ? 'සුරකිමින් පවතී...' : 'දත්ත ගබඩාවට එකතු කරන්න 💾'}
          </button>
        </form>
      </div>
    </div>
  );
}