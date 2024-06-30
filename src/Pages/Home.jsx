import React, { useState } from 'react';
import { FaStar, FaPlayCircle } from 'react-icons/fa';
import { courses, categories } from '../Data';
import Navbar from '../components/navbar'; // Adjust path as necessary
import ll from '../assets/pic.png'
import Footer from '../components/Footer';
const Home = () => {
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [courseData, setCourseData] = useState(courses);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <Navbar />

      <main className="container mx-auto py-2 px-8">
        <section className="mb-16">
        <div className="flex flex-wrap items-center">
  {/* Left Section */}
  <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0 flex flex-col justify-center">
    <h2 className="text-3xl font-bold mb-4 text-white">A Broad Selection of Courses</h2>
    <p className="text-xl mb-6 text-gray-300">
      Choose from over 210,000 online video courses with new additions published every month. Learning Destiny offers courses covering a wide range of topics, including web development, data science, business, design, marketing, and more. Whether you're a beginner looking to learn the basics or an expert seeking advanced skills, our platform has something for everyone.
    </p>
  </div>

  {/* Right Section */}
  <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
  <img
    src={ll}
    alt="Course Selection Image"
    className="w-full md:max-w-xs h-auto object-contain mb-2 md:mb-0"
    style={{ backgroundColor: 'transparent' }}
  />
  <p className="text-xl font-semibold text-white mt-0">Learning Destiny</p>
</div>


</div>



<div className="flex flex-wrap mb-8">
  {categories.slice(0, 5).map((category, index) => (
    <button
      key={index}
      className="text-sm font-semibold py-2 px-4 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white mb-2 mr-2"
    >
      {category.name}
    </button>
  ))}
</div>


          <div className="border border-gray-700 p-8 bg-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-white">Expand your career opportunities with Python</h3>
            <p className="mb-4 max-w-3xl text-gray-300">
              Take one of Learning Destiny's range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You'll learn how to build everything from games to sites to apps.
            </p>
            <button className="bg-purple-600 text-white py-2 px-4 font-semibold hover:bg-purple-700">Explore Python</button>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              {courseData.slice(0, 4).map((course) => (
                <div 
                  key={course.id} 
                  className="relative"
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
                  <h4 className="font-semibold mt-2 text-white">{course.title}</h4>
                  <p className="text-sm text-gray-400">{course.instructor}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-orange-400 font-bold mr-1">{course.rating.toFixed(1)}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(course.rating) ? "text-orange-400" : "text-gray-600"} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-1">({course.ratingCount})</span>
                  </div>
                  <p className="font-bold mt-1 text-white">{course.price}</p>
                  {hoveredCourse === course.id && (
                    <div className="absolute inset-0 bg-gray-800 p-4 shadow-lg z-10">
                      <h4 className="font-semibold text-white">{course.title}</h4>
                      <p className="text-sm text-green-400 mt-1">Updated {course.lastUpdated}</p>
                      <p className="text-sm mt-2 text-gray-300">{course.duration} total hours · {course.lectureCount} lectures · All Levels</p>
                      <p className="text-sm mt-2 text-gray-300">{course.description}</p>
                      <ul className="text-sm mt-2">
                        {course.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center mt-1 text-gray-300">
                            <FaPlayCircle className="mr-2 text-gray-500" /> {highlight}
                          </li>
                        ))}
                      </ul>
                      <button className="mt-4 bg-purple-600 text-white py-2 px-4 w-full font-semibold hover:bg-purple-700">
                        Add to cart
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section>
          <h2 className="text-2xl font-bold mb-6 text-white">Top categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="text-center">
                <img src={category.imageUrl} alt={category.name} className="w-full h-32 object-cover mb-2" />
                <h3 className="font-semibold text-gray-300">{category.name}</h3>
              </div>
            ))}
          </div>
        </section> */}
      </main>
<Footer/>
      {/* Footer remains unchanged */}
    </div>
  );
}

export default Home;
