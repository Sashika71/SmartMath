import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import TeacherLogin from '../components/TeacherLogin';
import AddQuestion from '../components/AddQuestion';
import StudentResults from '../components/StudentResults';

export default function TeacherPage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('add');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!user) {
    return <TeacherLogin onLoginSuccess={() => setUser(auth.currentUser)} />;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-blue-600">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">👨‍🏫 ගුරුවරයාගේ පාලක පුවරුව</h2>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-all text-sm"
        >
          පිටවන්න
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'add' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700'}`}
        >
          ➕ ප්‍රශ්න එකතු කරන්න
        </button>
        <button 
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'results' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700'}`}
        >
          📊 ළමයින්ගේ ලකුණු වාර්තා
        </button>
      </div>

      {activeTab === 'add' ? <AddQuestion /> : <StudentResults />}
    </div>
  );
}