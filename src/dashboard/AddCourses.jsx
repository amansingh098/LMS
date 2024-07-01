import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../firebase'; // Import firestore from your Firebase config

const AddCourses = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    chapters: []
  });

  // Handle input changes for course details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: value
    }));
  };

  // Add a new chapter to the course
  const addChapter = () => {
    setCourse(prevCourse => ({
      ...prevCourse,
      chapters: [...prevCourse.chapters, { title: '', videos: [] }]
    }));
  };

  // Handle chapter title input changes
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

  // Add a new video to a chapter
  const addVideo = (chapterIndex) => {
    const updatedChapters = [...course.chapters];
    updatedChapters[chapterIndex].videos.push({ title: '', videoLink: '' }); // Initially set videoLink as an empty string
    setCourse(prevCourse => ({
      ...prevCourse,
      chapters: updatedChapters
    }));
  };

  // Handle video title input changes
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

  // Handle form submission to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new course document in Firestore
      const courseRef = await addDoc(collection(firestore, 'courses'), {
        title: course.title,
        description: course.description,
        category: course.category,
        price: parseFloat(course.price), // Convert price to number if necessary
        createdAt: serverTimestamp()
      });

      // Add chapters to the course document
      for (const chapter of course.chapters) {
        const chapterRef = await addDoc(collection(courseRef, 'chapters'), {
          title: chapter.title,
          createdAt: serverTimestamp()
        });

        // Add videos to each chapter document
        for (const video of chapter.videos) {
          await addDoc(collection(chapterRef, 'videos'), {
            title: video.title,
            videoLink: video.videoLink,
            createdAt: serverTimestamp()
          });
        }
      }

      console.log('Course added successfully!');
      // Reset state to empty
      setCourse({
        title: '',
        description: '',
        category: '',
        price: '',
        chapters: []
      });
      // Optionally, navigate to another page upon successful submission
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="max-w-4xl w-full p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Course</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Course Title */}
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

          {/* Course Description */}
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

          {/* Course Category */}
          <div className="flex flex-col">
            <label htmlFor="category" className="text-lg font-semibold">Category</label>
            <select
              id="category"
              name="category"
              value={course.category}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select category</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="data">Data Science</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          {/* Course Price */}
          <div className="flex flex-col">
            <label htmlFor="price" className="text-lg font-semibold">Price ($)</label>
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

          {/* Chapters */}
          {course.chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="bg-gray-700 rounded-lg p-4 mt-4">
              <h2 className="text-xl font-semibold mb-2">Chapter {chapterIndex + 1}</h2>

              {/* Chapter Title */}
              <div className="flex flex-col">
                <label htmlFor={`chapterTitle${chapterIndex}`} className="text-lg font-semibold">Chapter Title</label>
                <input
                  type="text"
                  id={`chapterTitle${chapterIndex}`}
                  name="title"
                  value={chapter.title}
                  onChange={(e) => handleChapterInputChange(chapterIndex, e)}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter chapter title"
                  required
                />
              </div>

              {/* Videos */}
              {chapter.videos.map((video, videoIndex) => (
                <div key={videoIndex} className="flex flex-col mt-3">
                  <label htmlFor={`videoTitle${chapterIndex}-${videoIndex}`} className="text-lg font-semibold">Video {videoIndex + 1}</label>
                  <input
                    type="text"
                    id={`videoTitle${chapterIndex}-${videoIndex}`}
                    name="title"
                    value={video.title}
                    onChange={(e) => handleVideoInputChange(chapterIndex, videoIndex, e)}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter video title"
                    required
                  />
                  <input
                    type="text"
                    id={`videoLink${chapterIndex}-${videoIndex}`}
                    name="videoLink"
                    value={video.videoLink}
                    onChange={(e) => handleVideoInputChange(chapterIndex, videoIndex, e)}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    placeholder="Enter video link"
                    required
                  />
                </div>
              ))}

              {/* Add Video Button */}
              <button
                type="button"
                onClick={() => addVideo(chapterIndex)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
              >
                Add Video
              </button>
            </div>
          ))}

          {/* Add Chapter Button */}
          <button
            type="button"
            onClick={addChapter}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
          >
            Add Chapter
          </button>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg focus:outline-none"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourses;
