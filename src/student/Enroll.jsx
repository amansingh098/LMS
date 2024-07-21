import React, { useState } from 'react';
import Navbar from '../components/navbar'; // Ensure this path is correct
import Footer from '../components/Footer'; // Ensure this path is correct
import nestImage from '../assets/next.jpg'; // Adjust the path according to your project structure

const StaticEnroll = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    referralCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, referralCode } = formData;
    const courseTitle = 'Mastering React and Next.js';
    const message = `Hello, I would like to enroll in the course: ${courseTitle}. My details are Name: ${name}, Email: ${email}, Phone: ${phone}. Referral Code: ${referralCode}`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=9959068980&text=${encodeURIComponent(whatsappMessage)}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white text-gray-800 font-body">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{
          backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/009/382/864/small/comic-zoom-focus-lines-background-free-vector.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
        }}
      ></div>

      <main className="container mx-auto py-16 px-8 flex flex-col items-center relative z-10">
        <section
          className="flex flex-col md:flex-row items-center md:items-start p-8 rounded-lg shadow-lg w-full max-w-6xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background for the card
            backdropFilter: 'blur(5px)',
          }}
        >
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Mastering React and Next.js</h1>
            <p className="text-lg mb-6 text-gray-800">
              Learn how to build high-performance web applications using React and Next.js. This course covers everything from the basics to advanced concepts, including server-side rendering, static site generation, and API routes.
            </p>
            <p className="text-lg mb-4 text-gray-800"><strong>Instructor:</strong> Aditya</p>
            <p className="text-lg mb-4 text-gray-800"><strong>Last Updated:</strong> 20th July 2024</p>
            <p className="text-lg mb-4 text-gray-800"><strong>Duration:</strong> 2 hours</p>
            <p className="text-lg mb-4 text-gray-800"><strong>Lectures:</strong> 120</p>
            <p className="text-lg mb-4 text-gray-800"><strong>Level:</strong> Intermediate</p>
            <p className="text-lg mb-4 text-gray-800"><strong>Price:</strong> FREE</p>
            <p className="text-lg mb-4 text-gray-800"><strong>Highlights:</strong></p>
            <ul className="list-disc list-inside mb-4 text-gray-800">
              <li>Introduction to React</li>
              <li>State Management with Redux</li>
              <li>Server-side Rendering with Next.js</li>
              <li>Static Site Generation</li>
              <li>API Routes in Next.js</li>
              <li>Deploying Next.js Apps</li>
            </ul>

            <form onSubmit={handleSubmit} className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg mb-2 text-gray-800">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg mb-2 text-gray-800">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-lg mb-2 text-gray-800">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="referralCode" className="block text-lg mb-2 text-gray-800">Referral Code (optional)</label>
                <input
                  type="text"
                  id="referralCode"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="w-full p-3 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Register via WhatsApp
              </button>
            </form>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img src={nestImage} alt="Mastering React and Next.js" className="w-full h-auto rounded-lg shadow-lg object-cover mb-4" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StaticEnroll;
