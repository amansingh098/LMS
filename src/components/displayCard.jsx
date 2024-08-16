import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CourseDisplayCard = ({ course, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    navigate(`/admin-dashboard/course/${course.id}`);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden relative flex flex-col h-full">
      <img
        src={course.coverImage || 'https://source.unsplash.com/400x200/?course'}
        alt={course.title}
        className="w-full h-36 object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-lg font-semibold text-white">{course.title}</h2>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{course.description}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <img
              src={course.instructorPhotoURL || 'https://source.unsplash.com/32x32/?person'}
              alt={course.instructorName || 'Instructor'}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-gray-300 text-sm ml-2">{course.instructorName || 'Instructor'}</span>
          </div>
          <div className="text-gray-300 text-sm">
            ${course.price ? course.price.toFixed(2) : 'Free'}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleEnrollClick}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded focus:outline-none"
          >
            Enroll Now
          </button>
       
       
        </div>
      </div>
    </div>
  );
};

export default CourseDisplayCard;
