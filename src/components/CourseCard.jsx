import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const CourseCard = ({ course, onDelete, onEdit }) => {
  return (
    <div className="bg-gray-900 rounded-md shadow-md overflow-hidden relative flex flex-col">
      <img
        src={course.coverImage || 'https://source.unsplash.com/400x200/?course'}
        alt={course.title}
        className="w-full h-32 object-cover"
      />
      <div className="p-3 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-lg font-semibold text-white">{course.title}</h2>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{course.description}</p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <img
              src={course.instructorPhotoURL || 'https://source.unsplash.com/32x32/?person'}
              alt={course.instructorName || 'Instructor'}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-gray-300 text-xs ml-2">{course.instructorName || 'Instructor'}</span>
          </div>
          <div className="text-gray-300 text-xs">
            ${course.price ? course.price.toFixed(2) : 'Free'}
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <FaEdit size={14} />
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
