import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../Authentication/AuthContext';
import ReactPlayer from 'react-player';

// Importing FontAwesome icon for play button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const CoursePreview = () => {
  const { courseid } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseRef = doc(firestore, 'courses', courseid);
        const courseSnap = await getDoc(courseRef);
        
        if (!courseSnap.exists()) {
          console.log('No such document!');
          setLoading(false);
          return;
        }

        const courseData = courseSnap.data();

        // Fetch chapters and their videos
        const chaptersCollection = collection(courseRef, 'chapters');
        const chaptersSnap = await getDocs(chaptersCollection);
        const chaptersData = await Promise.all(chaptersSnap.docs.map(async chapterDoc => {
          const chapterData = chapterDoc.data();
          const videosCollection = collection(chapterDoc.ref, 'videos');
          const videosSnap = await getDocs(videosCollection);
          const videosData = videosSnap.docs.map(videoDoc => videoDoc.data());

          return {
            ...chapterData,
            videos: videosData
          };
        }));

        setCourse({
          ...courseData,
          chapters: chaptersData
        });

      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseid]);

  // Function to handle chapter selection
  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            <ReactPlayer
              url={selectedChapter?.videos[0]?.videoLink || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
              width="100%"
              height="480px"
              controls={true}
              className="rounded-lg overflow-hidden mb-8 lg:mb-0"
            />
          </div>
          {/* Course Details Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold">Course Details</h2>
              <p className="text-gray-400 mt-2">Price: ${course.price?.toFixed(2) || 'N/A'}</p>
              <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none">
                Enroll Now
              </button>
            </div>
            {/* Chapters Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Chapters</h2>
              {course.chapters && course.chapters.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {course.chapters.map((chapter, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                      <h3
                        className="text-xl font-bold mb-2 flex items-center cursor-pointer"
                        onClick={() => handleChapterSelect(chapter)}
                      >
                        Chapter {index + 1}: {chapter.title}
                      </h3>
                      {selectedChapter === chapter && (
                        <ul className="space-y-2">
                          {chapter.videos && chapter.videos.length > 0 ? (
                            chapter.videos.map((video, vidIndex) => (
                              <li key={vidIndex} className="text-gray-400">
                                <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
                                  <FontAwesomeIcon icon={faPlayCircle} className="text-blue-500 mr-2" />
                                  {video.title}
                                </a>
                              </li>
                            ))
                          ) : (
                            <p className="text-gray-400">No videos available</p>
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 mt-2">No chapters available</p>
              )}
            </div>
            
          </div>
        </div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-lg text-gray-300">{course.description}</p>
          <div className="flex items-center mt-4">
            <img
              src={currentUser?.photoURL || 'https://source.unsplash.com/40x40/?profile'}
              alt={currentUser?.displayName || 'Instructor'}
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="text-gray-400">{currentUser?.displayName || 'Instructor'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
