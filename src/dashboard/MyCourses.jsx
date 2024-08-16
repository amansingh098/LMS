import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase'; // Import firestore from your Firebase config
import { useAuth } from '../Authentication/AuthContext'; // Import AuthContext to get the current user
import CourseCard from '../components/CourseCard'; // Import CourseCard component

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user,currentUser } = useAuth(); // Get current user from AuthContext

useEffect(() => {
  const fetchCourses = async () => {
    if (!currentUser || !currentUser.displayName) {
      console.error('No current user logged in or display name not set.');
      setLoading(false);
      return;
    }

    try {
      const coursesRef = collection(firestore, 'courses');
      const q = query(coursesRef, where('instructorId', '==', user.userId));
      const querySnapshot = await getDocs(q);
      const courseData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(courseData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (courses.length === 0) {
    return <div>No courses available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default MyCourses;
