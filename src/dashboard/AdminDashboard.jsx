import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { FaBook, FaPlus, FaUsers, FaChartBar, FaCog } from 'react-icons/fa'; // Import icons from react-icons/fa

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="md:w-64 p-4 bg-gray-950">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            alt="Avatar"
            className="rounded-full w-16 h-16 mb-2"
          />
          <div className="text-xl font-bold">Username</div>
        </div>
        <nav>
          <button
            onClick={() => handleNavigate('/admin-dashboard/allCourses')}
            className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
          >
            <FaBook className="mr-2" />
            All Courses
          </button>
          <button
            onClick={() => handleNavigate('/admin-dashboard/addCourses')}
            className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
          >
            <FaPlus className="mr-2" />
            Add Courses
          </button>
          <button
            onClick={() => handleNavigate('/admin-dashboard/students')}
            className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
          >
            <FaUsers className="mr-2" />
            Students
          </button>
          <button
            onClick={() => handleNavigate('/admin-dashboard/analytics')}
            className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
          >
            <FaChartBar className="mr-2" />
            Analytics
          </button>
          <button
            onClick={() => handleNavigate('/admin-dashboard/settings')}
            className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
          >
            <FaCog className="mr-2" />
            Settings
          </button>
          <button
            onClick={() => handleNavigate('/')}
            className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
          >
            <FaCog className="mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Navbar */}
        <nav className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
          <div className="text-2xl font-bold">Learning Destiny Courses Management</div>
        </nav>

        {/* Content Area */}
        <div className="mt-6 bg-gray-700 p-6 rounded-lg shadow-lg">
          {/* Outlet for rendering nested routes */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
