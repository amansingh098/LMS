import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

const Video = () => {
  const [registered, setRegistered] = React.useState(false);
  const [locked] = React.useState(true);
  const navigate = useNavigate();

  const handleRegister = () => {
    setRegistered(true);
    navigate('/enroll');
  };

  return (
    <section
      className="w-full h-screen flex flex-col md:flex-row p-4"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-vector/business-geometric-blue-colorful-abstract-design-background_249611-712.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      {/* Overlay for background */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Locked Courses Section */}
      <div className="relative z-10 md:w-1/3 flex flex-col p-4 border-r border-gray-600">
        <h2 className="text-3xl font-bold mb-4 text-white">Course Sections</h2>
        <div className="space-y-4 flex-1 overflow-auto">
          {["Python Intro", "Python Data Types", "Python Functions"].map((section, index) => (
            <div
              key={index}
              className="p-4 bg-gray-700 rounded-lg flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-600 cursor-pointer"
            >
              <span className="text-lg text-gray-300 font-semibold">Section {section}</span>
              <div className="text-gray-500 flex items-center">
                {locked ? (
                  <LockClosedIcon
                    className="w-6 h-6 text-red-500 hover:text-red-400 transition-colors duration-300"
                  />
                ) : (
                  <LockOpenIcon
                    className="w-6 h-6 text-green-500 hover:text-green-300 transition-colors duration-300"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {!registered && (
          <button
            type="button"
            onClick={handleRegister}
            className="mt-6 py-2 px-4 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          >
            Register to Unlock
          </button>
        )}
      </div>
      
      {/* Video Section */}
      <div className="relative z-10 md:w-2/3 flex items-center justify-center p-4">
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full absolute top-0 left-0 rounded-lg border border-gray-600"
            src="https://www.youtube.com/embed/_uQrJ0TkZlc"
            title="Course Preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Video;
