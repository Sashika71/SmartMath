
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AdminLayout from './components/AdminLayout';
import StudentPage from './pages/StudentPage';
import AddQuestion from './pages/Teacher/AddQuestion';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import TeacherLogin from './components/TeacherLogin';
import StudentResults from './pages/Teacher/StudentResults';




export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<StudentPage />} />
        <Route path="/admin-login" element={<TeacherLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="add-questions" element={<AddQuestion />} />
         
          <Route path="results" element={<StudentResults />} />
        </Route>
      </Routes>
    </Router>
  );
}