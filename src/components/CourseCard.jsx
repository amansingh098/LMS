import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">{course.title}</h2>
        <p className="text-gray-400 mt-2">{course.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <img src={course.instructor.avatarUrl} alt={course.instructor.name} className="w-8 h-8 rounded-full" />
            <span className="text-gray-300 text-sm ml-2">{course.instructor.name}</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
