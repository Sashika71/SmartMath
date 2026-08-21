// import { useState } from 'react';
// import { db, storage } from '../../firebase';
// import { collection, addDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// const lessonsData = {
//   "6": ["සංඛ්‍යා රේඛාව", "භාග", "දශම", "කෝණ", "සමමිතිකතාව"],
//   "7": ["සමීකරණ", "ප්‍රතිශත", "වර්ගඵලය", "පරිමිතිය", "අනුපාත"],
//   "8": ["වීජීය ප්‍රකාශන", "ප්‍රස්තාර", "ඝන වස්තු", "සම්භාවිතාව", "දර්ශක"],
//   "9": ["වර්ගමූලය", "ත්‍රිකෝණමිතිය", "සමාන්තර ශ්‍රේණි", "ලඝුගණක", "කුලක"]
// };

// export default function AddMaterials() {
//   const [grade, setGrade] = useState('');
//   const [lesson, setLesson] = useState('');
//   const [title, setTitle] = useState('');
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleGradeChange = (e) => {
//     setGrade(e.target.value);
//     setLesson('');
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSaveMaterial = async (e) => {
//     e.preventDefault();
//     if (!grade || !lesson || !title || !file) {
//       alert("කරුණාකර සියලුම කොටස් පුරවා ෆයිල් එකක් තෝරන්න!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const fileRef = ref(storage, `materials/${grade}/${lesson}/${Date.now()}_${file.name}`);
//       const snapshot = await uploadBytes(fileRef, file);
//       const downloadURL = await getDownloadURL(snapshot.ref);

//       await addDoc(collection(db, 'materials'), {
//         grade: grade,
//         lesson: lesson,
//         title: title,
//         fileUrl: downloadURL,
//         fileName: file.name,
//         fileType: file.type,
//         createdAt: new Date()
//       });

//       alert("විෂය කරුණු සාර්ථකව ඇතුළත් කළා! 🎉");
//       setGrade(''); setLesson(''); setTitle(''); setFile(null);
//       e.target.reset();
//     } catch (error) {
//       console.error("Error uploading material: ", error);
//       alert("දෝෂයක්! Firebase සම්බන්ධතාවය පරීක්ෂා කරන්න.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto my-6 md:my-10 px-4 md:px-0">
//       <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
//           📚 විෂය කරුණු ඇතුළත් කිරීම
//         </h2>

//         <form onSubmit={handleSaveMaterial} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <div>
//               <label className="block text-gray-700 font-semibold mb-1">ශ්‍රේණිය (Grade):</label>
//               <select
//                 value={grade}
//                 onChange={handleGradeChange}
//                 className="w-full border border-orange-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-400 bg-white"
//               >
//                 <option value="">-- තෝරන්න --</option>
//                 <option value="6">6 ශ්‍රේණිය</option>
//                 <option value="7">7 ශ්‍රේණිය</option>
//                 <option value="8">8 ශ්‍රේණිය</option>
//                 <option value="9">9 ශ්‍රේණිය</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-semibold mb-1">පාඩමේ නම (Lesson):</label>
//               <select
//                 value={lesson}
//                 onChange={(e) => setLesson(e.target.value)}
//                 disabled={!grade}
//                 className="w-full border border-orange-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-400 bg-white disabled:bg-gray-200"
//               >
//                 <option value="">-- පාඩම තෝරන්න --</option>
//                 {grade && lessonsData[grade].map((lessonName, index) => (
//                   <option key={index} value={lessonName}>{lessonName}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">මාතෘකාව / කෙටි විස්තරය:</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
//               placeholder="උදා: භාග පාඩමේ කෙටි සටහන"
//             />
//           </div>

//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label className="block text-amber-800 font-semibold mb-2">PDF හෝ Image එක තෝරන්න:</label>
//             <input
//               type="file"
//               accept=".pdf, image/*"
//               onChange={handleFileChange}
//               className="w-full border border-orange-200 p-3 rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-amber-800 text-white font-bold text-lg py-4 rounded-lg hover:bg-amber-900 transition-all shadow-md disabled:bg-gray-400"
//           >
//             {loading ? 'අප්ලෝඩ් වෙමින් පවතී (කරුණාකර රැඳී සිටින්න)...' : 'විෂය කරුණු එකතු කරන්න 📤'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }