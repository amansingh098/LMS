import React, { useState } from 'react';
import { FaStar, FaPlayCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { courses as initialCourses, categories } from '../Data';
import Navbar from '../components/navbar'; // Adjust path as necessary
import Footer from '../components/Footer';
import pic from '../assets/pic.png';

const Home = ({ isDarkMode }) => {
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [courses, setCourses] = useState(initialCourses);
  const navigate = useNavigate();

  const handleEnrollClick = (courseId) => {
    navigate(`/enroll/${courseId}`);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'} font-body`}>
      <main className="container mx-auto py-2 px-4 md:px-8">
      <section
        className="flex flex-col md:flex-row items-center justify-center md:justify-start text-center md:text-left py-16 md:py-32 relative overflow-hidden"
        style={{
          backgroundImage: `url(https://1vvan.github.io/blinqpay/images/top-block/background-top.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Logo Section */}
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 z-10">
          <img src={pic} alt="Learning Destiny Logo" className="h-24 md:h-48 rounded-lg shadow-lg" />
        </div>

        {/* Text Section */}
        <div className="z-10 max-w-full md:max-w-2xl lg:max-w-4xl p-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            A Broad Selection of Courses
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6">
            Choose from over 10,000 online video courses with new additions published every month. Learning Destiny offers courses covering a wide range of topics, including web development, data science, business, design, marketing, and more. Whether you're a beginner looking to learn the basics or an expert seeking advanced skills, our platform has something for everyone.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {categories.slice(0, 5).map((category, index) => (
              <button
                key={index}
                className="text-xs sm:text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                onClick={() => navigate(`/category/${category.name}`)} // Assuming category pages are implemented
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

        <section className="mb-16">
          <div
            className="relative p-4 md:p-8"
            style={{
              backgroundImage: `url('https://www.washingtonpost.com/brand-studio/leidos/inside-the-cyber-trenches/media/hero-curtain.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: isDarkMode ? 'white' : 'black',
            }}
          >
            <div
              className={`relative z-10 border p-4 md:p-8 ${isDarkMode ? 'border-gray-700 bg-gray-800 bg-opacity-70' : 'border-gray-300 bg-gray-100 bg-opacity-70'}`}
              style={{ backdropFilter: 'blur(5px)' }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-accent">Expand your career opportunities with React</h3>
              <p className="mb-4 max-w-xl md:max-w-3xl">
                Web development involves creating and maintaining websites, encompassing web design, web publishing, web programming, and database management.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {courses.map(course => (
                  <div
                    key={course.id}
                    className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-300 ${isDarkMode ? 'border-pink-500 hover:border-blue-500 bg-gray-900 text-gray-200' : 'border-blue-500 hover:border-pink-500 bg-white text-black'}`}
                    onMouseEnter={() => setHoveredCourse(course.id)}
                    onMouseLeave={() => setHoveredCourse(null)}
                    style={{ height: '300px' }} // Fixed height
                  >
                    <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                    <h4 className="font-semibold mt-2 text-sm">{course.title}</h4>
                    <p className="text-xs">{course.instructor}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-orange-400 font-bold mr-1 text-sm">{course.rating.toFixed(1)}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < Math.round(course.rating) ? 'text-orange-400' : 'text-gray-600'}
                          />
                        ))}
                      </div>
                      <span className="text-xs ml-1">({course.ratingCount})</span>
                    </div>
                    <p className="font-bold mt-1 text-sm">{course.price}</p>
                    {hoveredCourse === course.id && (
                      <div className={`absolute inset-0 p-4 shadow-lg z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`} style={{ height: '100%' }}>
                        <h4 className="font-semibold text-sm">{course.title}</h4>
                        <p className="text-xs mt-1">{course.lastUpdated}</p>
                        <p className="text-xs mt-2">{course.duration} total hours · {course.lectureCount} lectures · All Levels</p>
                        <p className="text-xs mt-2">{course.description}</p>
                        <ul className="text-xs mt-2">
                          {course.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-center mt-1">
                              <FaPlayCircle className="mr-2" /> {highlight}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => handleEnrollClick(course.id)}
                          className={`mt-4 py-2 px-4 w-full font-semibold rounded ${
                            isDarkMode ? 'bg-white text-black hover:bg-blue-600' : 'bg-black text-white hover:bg-blue-600'
                          }`}
                          style={{ fontSize: '0.875rem' }} // Adjust font size for the button
                        >
                          Enroll Now
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;