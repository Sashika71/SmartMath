import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function TeacherLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      setLoginError('Email හෝ Password වැරදියි. නැවත උත්සාහ කරන්න.');
    }
    setIsLoggingIn(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">MathsHub ගුරු පිවිසුම</h2>
      
      {loginError && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">
          {loginError}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email ලිපිනය:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">මුරපදය (Password):</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoggingIn}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md disabled:bg-gray-400 mt-4"
        >
          {isLoggingIn ? 'ඇතුල් වෙමින් පවතී...' : 'ඇතුල් වන්න'}
        </button>
      </form>
    </div>
  );
}