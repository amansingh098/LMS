import React, { useState } from 'react';

const Teach = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    experience: '',
    qualifications: '',
    referralCode: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, subject, experience, qualifications, referralCode } = formData;
    const message = `Hello, I would like to apply to teach on your platform. Here are my details:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Subject: ${subject}
    Experience: ${experience} years
    Qualifications: ${qualifications}
    Referral Code: ${referralCode || 'N/A'}`;
    const whatsappUrl = `https://wa.me/9059898900?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white text-gray-800 font-body">
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
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <div className="md:w-full md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Apply to Teach</h1>
            <p className="text-lg mb-6 text-gray-800">
              If you're passionate about teaching and have expertise in your subject area, we invite you to join our platform and share your knowledge with our students.
            </p>

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
                <label htmlFor="number" className="block text-lg mb-2 text-gray-800">Phone</label>
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
                <label htmlFor="subject" className="block text-lg mb-2 text-gray-800">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="experience" className="block text-lg mb-2 text-gray-800">Experience (in years)</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full p-3 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="qualifications" className="block text-lg mb-2 text-gray-800">Qualifications</label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  className="w-full p-3 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  rows="4"
                  required
                ></textarea>
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
                Apply via WhatsApp
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Teach;
