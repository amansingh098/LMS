import React from 'react';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useAuth } from './Authentication/AuthContext'; // Adjust the import path as needed
import CoursePreview from './dashboard/CoursePreview';

// AdminLayout component for protected routes
const AdminLayout = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

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
            <Route path="course/:courseid" element={<CoursePreview/>}/>
            <Route path="students" element={<Students />} />

            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Add more top-level routes here as needed */}
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;