import React from 'react';
import CourseCard from '../components/CourseCard'; // Import CourseCard component

const AllCourses = () => {
  // Example data (replace with actual course data)
  const courses = [
    {
      "id": 1,
      "title": "React - The Complete Guide (incl Hooks, React Router, Redux)",
      "description": "Dive in and learn React from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
      "imageUrl": "https://source.unsplash.com/800x600/?react", // Random image URL for React
      "instructor": {
        "name": "Maximilian Schwarzmüller",
        "avatarUrl": "https://source.unsplash.com/40x40/?profile" // Random profile image URL
      }
    },
    {
      "id": 2,
      "title": "JavaScript - The Complete Guide 2024 (Beginner + Advanced)",
      "description": "Modern JavaScript from the beginning - all the way up to JS expert level! THE must-have JavaScript resource in 2024.",
      "imageUrl": "https://source.unsplash.com/800x600/?javascript", // Random image URL for JavaScript
      "instructor": {
        "name": "Academind by Maximilian Schwarzmüller",
        "avatarUrl": "https://source.unsplash.com/40x40/?instructor" // Random profile image URL
      }
    }
  ];
      
    // Add more courses as needed
  


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      );
    };

export default AllCourses;
