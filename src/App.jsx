import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import StudentPage from './pages/StudentPage';
import AddQuestion from './pages/Teacher/AddQuestion';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import TeacherLogin from './components/TeacherLogin';
import StudentResults from './pages/Teacher/StudentResults';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sinhala">

        <Header />

        <div className="p-4 md:p-8">
          <Routes>

            <Route path="/" element={<StudentPage />} />
            {/* <Route path="/admin-login" element={<TeacherLogin />} /> */}
            <Route path="/admin">
              <Route index element={<TeacherDashboard />} /> 
              <Route path="add-questions" element={<AddQuestion />} />
               <Route path="results" element={<StudentResults />}
               />
            </Route>
            

          </Routes>
        </div>
      </div>
    </Router>
  );
}