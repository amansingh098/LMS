import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AdminDashboard from './dashboard/AdminDashboard';
import AddCourses from './dashboard/AddCourses';

import './App.css';
import AllCourses from './dashboard/AllCourses';
import Students from './dashboard/Students';
import Analytics from './dashboard/Analytics';
import Settings from './dashboard/Settings';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Admin Dashboard Routes */}
       
            <Route path="/admin-dashboard"  element={<AdminDashboard />}>
              <Route
                path="/admin-dashboard/addCourses"
               
                element={<AddCourses />}
              />
               <Route
                path="/admin-dashboard/allCourses"
               
                element={<AllCourses />}
              />
              <Route
                path="/admin-dashboard/students"
               
                element={<Students />}
              /><Route
              path="/admin-dashboard/analytics"
             
              element={<Analytics />}
            /><Route
            path="/admin-dashboard/settings"
           
            element={<Settings />}
          />
              </Route>

          {/* Add more top-level routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
