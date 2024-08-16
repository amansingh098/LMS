/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, deleteDoc, doc,updateDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase'; // Import firestore from your Firebase config
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { useAuth } from '../Authentication/AuthContext';
import CourseCard from '../components/CourseCard';
import { FaTrashAlt } from 'react-icons/fa';// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AddCourses = () => {
  const { currentUser ,user} = useAuth();
  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    coverImage: '',
    chapters: [],
    accessSettings: {
      allow: [],
      deny: []
    }
  });

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState({});
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!currentUser || !currentUser.uid) {
        console.error('No current user logged in.');
        return;
      }
      const coursesRef = collection(firestore, 'courses');
      const q = query(coursesRef, where('instructorId', '==', user.userId));
      const querySnapshot = await getDocs(q);
      const courseData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(courseData);
    };

    fetchCourses();
  }, [currentUser]);

  console.log(courses);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: value
    }));
  };

  const handleAccessSettingsChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      accessSettings: {
        ...prevCourse.accessSettings,
        [name]: value.split(',').map(item => item.trim())
      }
    }));
  };
  const handleEditCourse = (courseId) => {
    const selectedCourse = courses.find((c) => c.id === courseId);
    if (selectedCourse) {
      setCourse(selectedCourse);
      setEditMode(true);
      setEditingCourseId(courseId);
    }
  };
  const addChapter = () => {
    setCourse(prevCourse => ({
      ...prevCourse,
      chapters: [...prevCourse.chapters, { title: '', videos: [] }]
    }));
  };

  const handleChapterInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChapters = [...course.chapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      [name]: value
    };
    setCourse(prevCourse => ({
      ...prevCourse,
      chapters: updatedChapters
    }));
  };

  const addVideo = (chapterIndex) => {
    const updatedChapters = [...course.chapters];
    updatedChapters[chapterIndex].videos.push({ title: '', videoLink: '' });
    setCourse(prevCourse => ({
      ...prevCourse,
      chapters: updatedChapters
    }));
  };

  const handleVideoInputChange = (chapterIndex, videoIndex, e) => {
    const { name, value } = e.target;
    const updatedChapters = [...course.chapters];
    updatedChapters[chapterIndex].videos[videoIndex] = {
      ...updatedChapters[chapterIndex].videos[videoIndex],
      [name]: value
    };
    setCourse(prevCourse => ({
      ...prevCourse,
      chapters: updatedChapters
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!currentUser || !currentUser.uid) {
        console.error('No current user logged in.');
        return;
      }
  
      if (editMode && editingCourseId) {
        // Update existing course
        const courseRef = doc(firestore, 'courses', editingCourseId);
        await updateDoc(courseRef, {
          instructorId: currentUser.uid,
          instructorName: currentUser.displayName,
          title: course.title,
          description: course.description,
          category: course.category,
          price: parseFloat(course.price),
          coverImage: course.coverImage,
          chapters: course.chapters,
          accessSettings: course.accessSettings,
          updatedAt: serverTimestamp()
        });
  
        console.log('Course updated successfully!');
      } else {
        // Add new course
        await addDoc(collection(firestore, 'courses'), {
          instructorId: currentUser.uid,
          instructorName: currentUser.displayName,
          title: course.title,
          description: course.description,
          category: course.category,
          price: parseFloat(course.price),
          coverImage: course.coverImage,
          chapters: course.chapters,
          accessSettings: course.accessSettings,
          createdAt: serverTimestamp()
        });
  
        console.log('Course added successfully!');
      }
  
      // Reset course form
      setCourse({
        title: '',
        description: '',
        category: '',
        price: '',
        coverImage: '',
        chapters: [],
        accessSettings: {
          allow: [],
          deny: []
        }
      });
  
      setEditMode(false);
      setEditingCourseId(null);
  
      // Fetch updated list of courses by current instructor
      const coursesRef = collection(firestore, 'courses');
      const q = query(coursesRef, where('instructorId', '==', currentUser.uid));
      const courseCollection = await getDocs(q);
      const courseList = courseCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(courseList);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };
  
  

  const deleteCourse = async (courseId) => {
    try {
      await deleteDoc(doc(firestore, 'courses', courseId));
      console.log('Course deleted successfully!');

      const courseCollection = await getDocs(collection(firestore, 'courses'));
      const courseList = courseCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(courseList);

      let totalEarnings = 0;
      const enrollmentsData = {};
      for (const course of courseList) {
        const enrollmentsCount = await countEnrolledStudents(course.id);
        enrollmentsData[course.id] = enrollmentsCount;
        totalEarnings += enrollmentsCount * course.price;
      }
      setEnrollments(enrollmentsData);
      setTotalEarnings(totalEarnings);

    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const countEnrolledStudents = async (courseId) => {
    try {
      const enrollments = await getDocs(collection(firestore, `courses/${courseId}/enrollments`));
      return enrollments.docs.length;
    } catch (error) {
      console.error('Error counting enrollments:', error);
      return 0;
    }
  };

  const data = {
    labels: courses.map(course => course.title),
    datasets: [
      {
        label: 'Enrollments',
        data: courses.map(course => enrollments[course.id] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const earningsData = {
    labels: ['Total Earnings'],
    datasets: [
      {
        label: 'Earnings ($)',
        data: [totalEarnings],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="min-h-screen flex items-start justify-center text-white p-4">
      <div className="flex max-w-7xl w-full">
        {/* Left Section: Add Course Form */}
        <div className="w-1/2 p-4 bg-gray-800 rounded-lg shadow-lg mr-4">
        <h1 className="text-3xl font-bold mb-6 text-center">{editMode ? 'Edit Course' : 'Add New Course'}</h1>          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="title" className="text-lg font-semibold">Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={course.title}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course title"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-lg font-semibold">Description</label>
              <textarea
                id="description"
                name="description"
                value={course.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course description"
                required
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label htmlFor="category" className="text-lg font-semibold">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={course.category}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course category"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="price" className="text-lg font-semibold">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={course.price}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course price"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="coverImage" className="text-lg font-semibold">Cover Image URL</label>
              <input
                type="text"
                id="coverImage"
                name="coverImage"
                value={course.coverImage}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter cover image URL"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="allow" className="text-lg font-semibold">Allow Access (comma-separated)</label>
              <input
                type="text"
                id="allow"
                name="allow"
                value={course.accessSettings.allow.join(', ')}
                onChange={handleAccessSettingsChange}
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter allowed users"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="deny" className="text-lg font-semibold">Deny Access (comma-separated)</label>
              <input
                type="text"
                id="deny"
                name="deny"
                value={course.accessSettings.deny.join(', ')}
                onChange={handleAccessSettingsChange}
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter denied users"
                required
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Chapters</h2>
              {course.chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className="space-y-4 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor={`chapter-title-${chapterIndex}`} className="text-lg font-semibold">Chapter Title</label>
                    <input
                      type="text"
                      id={`chapter-title-${chapterIndex}`}
                      name="title"
                      value={chapter.title}
                      onChange={(e) => handleChapterInputChange(chapterIndex, e)}
                      className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter chapter title"
                      required
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Videos</h3>
                    {chapter.videos.map((video, videoIndex) => (
                      <div key={videoIndex} className="space-y-2">
                        <div className="flex flex-col">
                          <label htmlFor={`video-title-${chapterIndex}-${videoIndex}`} className="text-lg font-semibold">Video Title</label>
                          <input
                            type="text"
                            id={`video-title-${chapterIndex}-${videoIndex}`}
                            name="title"
                            value={video.title}
                            onChange={(e) => handleVideoInputChange(chapterIndex, videoIndex, e)}
                            className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter video title"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor={`video-link-${chapterIndex}-${videoIndex}`} className="text-lg font-semibold">Video Link</label>
                          <input
                            type="text"
                            id={`video-link-${chapterIndex}-${videoIndex}`}
                            name="videoLink"
                            value={video.videoLink}
                            onChange={(e) => handleVideoInputChange(chapterIndex, videoIndex, e)}
                            className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter video link"
                            required
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addVideo(chapterIndex)}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Add Video
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addChapter}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Chapter
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
         {editMode ? 'Update Course' : 'Add Course'}
            </button>
          </form>
        </div>

        {/* Right Section: Course List and Charts */}
        <div className="w-1/2 p-4 bg-gray-800 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-6 text-center">Your Courses</h2>
  {courses.length > 0 ? (
  <div className="relative">
    <div className="max-h-96 overflow-y-auto pr-2">
      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course.id} className="mb-4">
            <CourseCard 
              course={course}
              onDelete={() => deleteCourse(course.id)}
              onEdit={() => handleEditCourse(course.id)}
            />
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-8">
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Course Enrollments' },
          },
        }}
      />
      <Bar
        data={earningsData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Total Earnings' },
          },
        }}
      />
    </div>
  </div>
) : (
  <p>No courses available.</p>
)}

</div>


      </div>
    </div>
  );
};

export default AddCourses;
