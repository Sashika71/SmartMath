import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

export default function TeacherLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setResetMessage('');
    setResetError('');
    setIsLoggingIn(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate('/admin');
      }
    } catch (error) {
      setLoginError('Email හෝ Password වැරදියි. නැවත උත්සාහ කරන්න.');
    }
    setIsLoggingIn(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoginError('');
    setResetMessage('');
    setResetError('');

    if (!email) {
      setResetError('කරුණාකර පළමුව ඔබගේ Email ලිපිනය ඉහළින් ඇතුළත් කර, පසුව මෙය ඔබන්න.');
      return;
    }

    setIsResetting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage('මුරපදය වෙනස් කිරීමේ ලින්ක් එකක් ඔබගේ Email එකට යැව්වා. කරුණාකර පරීක්ෂා කරන්න.');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setResetError('මෙම Email ලිපිනයෙන් ගිණුමක් සොයාගත නොහැක.');
      } else {
        setResetError('දෝෂයක් මතු විය. නැවත උත්සාහ කරන්න.');
      }
    }
    setIsResetting(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border-t-8 border-[#003152] mt-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#003152] tracking-wide">SmartMath</h1>
        <p className="text-slate-700 text-sm mt-1">ගුරු පිවිසුම</p>
      </div>

      {loginError && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">
          {loginError}
        </div>
      )}
      
      {resetError && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">
          {resetError}
        </div>
      )}

      {resetMessage && (
        <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 text-sm text-center font-medium">
          {resetMessage}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email ලිපිනය:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#003152]" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">මුරපදය (Password):</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full border border-gray-300 p-3 pr-12 rounded-lg outline-none focus:ring-2 focus:ring-[#003152]" 
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#003152] focus:outline-none"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoggingIn}
          className="w-full bg-[#003152] text-white font-bold py-3 rounded-lg hover:bg-[#003152]/90 transition-all shadow-md disabled:bg-gray-400 mt-4 cursor-pointer"
        >
          {isLoggingIn ? 'ඇතුල් වෙමින් පවතී...' : 'ඇතුල් වන්න'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handleForgotPassword}
          disabled={isResetting}
          className="text-sm text-[#003152] hover:text-[#003152]/80 hover:underline transition-colors bg-transparent border-none cursor-pointer disabled:text-gray-400"
        >
          {isResetting ? 'ලින්ක් එක යවමින් පවතී...' : 'මුරපදය අමතකද? (Forgot Password)'}
        </button>
      </div>
    </div>
  );
}