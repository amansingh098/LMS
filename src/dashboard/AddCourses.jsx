import React, { useState } from 'react';

const AddCourses = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    chapters: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addChapter = () => {
    setCourse(prevState => ({
      ...prevState,
      chapters: [...prevState.chapters, { title: '', videos: [] }]
    }));
  };

  const handleChapterInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChapters = [...course.chapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      [name]: value
    };
    setCourse(prevState => ({
      ...prevState,
      chapters: updatedChapters
    }));
  };

  const addVideo = (chapterIndex) => {
    const updatedChapters = [...course.chapters];
    updatedChapters[chapterIndex].videos.push('');
    setCourse(prevState => ({
      ...prevState,
      chapters: updatedChapters
    }));
  };

  const handleVideoInputChange = (chapterIndex, videoIndex, e) => {
    const { value } = e.target;
    const updatedChapters = [...course.chapters];
    updatedChapters[chapterIndex].videos[videoIndex] = value;
    setCourse(prevState => ({
      ...prevState,
      chapters: updatedChapters
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(course); // Handle form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-white">
      <div className="max-w-4xl w-full p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Course</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-semibold">
              Course Title
            </label>
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
            <label htmlFor="description" className="text-lg font-semibold">
              Description
            </label>
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
            <label htmlFor="category" className="text-lg font-semibold">
              Category
            </label>
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
          <div className="flex flex-col">
            <label htmlFor="price" className="text-lg font-semibold">
              Price ($)
            </label>
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
              <div className="flex flex-col">
                <label htmlFor={`chapterTitle${chapterIndex}`} className="text-lg font-semibold">
                  Chapter Title
                </label>
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
                  <label htmlFor={`videoTitle${chapterIndex}-${videoIndex}`} className="text-lg font-semibold">
                    Video {videoIndex + 1}
                  </label>
                  <input
                    type="text"
                    id={`videoTitle${chapterIndex}-${videoIndex}`}
                    value={video}
                    onChange={(e) => handleVideoInputChange(chapterIndex, videoIndex, e)}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter video title or URL"
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
