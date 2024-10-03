import React from 'react';

function About() {
  return (
    <div className="flex justify-center items-center h-full p-8 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg flex">
        <div className="mr-8">
          <div className="bg-gray-300 w-64 h-64 flex items-center justify-center rounded-lg">
            <span className="text-gray-500 text-2xl">400 x 400</span>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            We are a team of passionate developers dedicated to building modern and responsive web applications. 
            Our goal is to deliver high-quality software that meets the needs of our users.
          </p>
          <p className="text-gray-700">
            With years of experience in the industry, we have honed our skills in a variety of technologies and methodologies. 
            We are committed to continuous learning and improvement, always staying up-to-date with the latest trends and best practices in web development.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
