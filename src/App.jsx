import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AdminDashboard from './dashboard/AdminDashboard';
import AddCourses from './dashboard/AddCourses';
import AllCourses from './dashboard/AllCourses';
import Students from './dashboard/Students';
import Analytics from './dashboard/Analytics';
import Settings from './dashboard/Settings';
import CoursePreview from './dashboard/CoursePreview';
import Enroll from './student/Enroll';
import Navbar from './components/navbar'; // Adjust path as necessary
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './Authentication/AuthContext'; // Adjust path as needed
import Video from './student/Video';
import Teach from './student/Teach'; // Import the Teach component
import BusinessForm from './student/BusinessForm';
import Aboutus from './Pages/Aboutus';
import MyCourses from './dashboard/MyCourses';

// AdminLayout component for protected routes
const AdminLayout = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'}`}>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/video" element={<Video />} />
          <Route path="/teach" element={<Teach />} />
          <Route path="/BusinessForm" element={<BusinessForm />} />
          <Route path="/Aboutus" element={<Aboutus />} />
           {/* Add Teach route */}
          {/* Protected Admin Dashboard Routes */}
          <Route 
            path="/admin-dashboard" 
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          >
            <Route path="addCourses" element={<AddCourses />} />
            <Route path="allCourses" element={<AllCourses />} />
            <Route path="course/:courseId" element={<CoursePreview />} />
            <Route path="myCourses" element={<MyCourses/>}/>
            <Route path="students" element={<Students />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;