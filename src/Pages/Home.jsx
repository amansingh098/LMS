import React, { useState } from 'react';
import { FaStar, FaPlayCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { courses, categories } from '../Data';
import Navbar from '../components/navbar'; // Adjust path as necessary
import ll from '../assets/pic.png';
import Footer from '../components/Footer';

const Home = () => {
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [courseData, setCourseData] = useState(courses);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEnrollClick = () => {
    navigate('/enroll');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'} font-body`}>
      <Navbar />

      <main className="container mx-auto py-2 px-8">
        <section className="mb-16">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0 flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-4 text-primary">A Broad Selection of Courses</h2>
              <p className="text-xl mb-6">
                Choose from over 10,000 online video courses with new additions published every month. Learning Destiny offers courses covering a wide range of topics, including web development, data science, business, design, marketing, and more. Whether you're a beginner looking to learn the basics or an expert seeking advanced skills, our platform has something for everyone.
              </p>
              <button
                className={`py-2 px-4 font-semibold rounded ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
                onClick={toggleTheme}
              >
                {isDarkMode ? 'Light' : 'Dark'} Mode
              </button>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
              <img
                src={ll}
                alt="Course Selection Image"
                className="w-full md:max-w-xs h-auto object-contain mb-2 md:mb-0"
                style={{ backgroundColor: 'transparent' }}
              />
              <p className="text-xl font-semibold mt-0">Learning Destiny</p>
            </div>
          </div>

          <div className="flex flex-wrap mb-8">
            {categories.slice(0, 5).map((category, index) => (
              <button
                key={index}
                className={`text-sm font-semibold py-2 px-4 rounded mb-2 mr-2 ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className={`border p-8 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-100'}`}>
            <h3 className="text-2xl font-bold mb-4 text-accent">Expand your career opportunities with Python</h3>
            <p className="mb-4 max-w-3xl">
              Take one of Learning Destiny range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You'll learn how to build everything from games to sites to apps.
            </p>
            

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              {courseData.slice(0, 4).map((course) => (
                <div
                  key={course.id}
                  className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-300 ${isDarkMode ? 'border-pink-500 hover:border-blue-500 bg-gray-900 text-gray-200' : 'border-blue-500 hover:border-pink-500 bg-white text-black'}`}
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <h4 className="font-semibold mt-2">{course.title}</h4>
                  <p className="text-sm">{course.instructor}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-orange-400 font-bold mr-1">{course.rating.toFixed(1)}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(course.rating) ? 'text-orange-400' : 'text-gray-600'} />
                      ))}
                    </div>
                    <span className="text-xs ml-1">({course.ratingCount})</span>
                  </div>
                  <p className="font-bold mt-1">{course.price}</p>
                  {hoveredCourse === course.id && (
                    <div className={`absolute inset-0 p-4 shadow-lg z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
                      <h4 className="font-semibold">{course.title}</h4>
                      <p className="text-sm mt-1">{course.lastUpdated}</p>
                      <p className="text-sm mt-2">{course.duration} total hours · {course.lectureCount} lectures · All Levels</p>
                      <p className="text-sm mt-2">{course.description}</p>
                      <ul className="text-sm mt-2">
                        {course.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center mt-1">
                            <FaPlayCircle className="mr-2" /> {highlight}
                          </li>
                        ))}
                      </ul>
                      <button
  onClick={handleEnrollClick} // Handle click event
  className={`mt-4 py-2 px-4 w-full font-semibold rounded ${
    isDarkMode
      ? 'bg-white text-black hover:bg-blue-600'
      : 'bg-black text-white hover:bg-blue-600'
  }`}
>
  Enroll Now
</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;