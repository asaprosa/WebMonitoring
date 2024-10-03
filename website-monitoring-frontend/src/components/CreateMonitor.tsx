import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';  // Loading icon
import { FaCheckCircle } from 'react-icons/fa';  // Success icon
import { MdError } from 'react-icons/md';  // Error icon

const CreateMonitor: React.FC = () => {
  const [url, setUrl] = useState('');
  const [errorType, setErrorType] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');  // Error state
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    setError(''); // Clear any previous errors
    try {
      // POST request to the server to create a new monitor
      await axios.post('http://localhost:5000/monitors', { url, errorType, email });

      // Set success message and turn off loading
      setLoading(false);
      setSuccess(true);

      // After 2 seconds, navigate to the dashboard
      setTimeout(() => {
        setSuccess(false);
        navigate('/main');  // Redirect to the dashboard after success
      }, 2000);
    } catch (error) {
      console.error('Error creating monitor:', error);
      setLoading(false); // Turn off loading in case of error
      setError('Error creating monitor. Please try again.');
    }
  };

 

  return (
    <div className="mt-20 flex flex-col items-center   p-6">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Create a New Monitor</h2>

      {/* Form for creating a new monitor */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        {/* Input field for the website URL */}
        <div className="mb-6">
          <label htmlFor="url" className="block text-gray-700 text-lg mb-2">Website URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>

        {/* Dropdown for selecting alert condition */}
        <div className="mb-6">
          <label htmlFor="errorType" className="block text-gray-700 text-lg mb-2">Alert Condition:</label>
          <select
            id="errorType"
            value={errorType}
            onChange={(e) => setErrorType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          >
            <option value="unavailable">When URL is unavailable</option>
            <option value="404">When status code is 404</option>
            <option value="500">When status code is 500</option>
            <option value="501">When status code is 501</option>
            <option value="200">When status code is 200</option>
          </select>
        </div>

        {/* Input field for the user's email */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-lg mb-2">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-slate-100 hover:text-black transition-colors">
          Create Monitor
        </button>
      </form>

      {/* Loading popup */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md flex items-center gap-4">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl text-gray-700" />
            <p className="text-lg text-gray-700">Saving monitor...</p>
          </div>
        </div>
      )}

      {/* Success popup */}
      {success && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md flex items-center gap-4">
            <FaCheckCircle className="text-2xl text-green-600" />
            <p className="text-lg text-green-600">Monitor Created Successfully!</p>
          </div>
        </div>
      )}

      {/* Error popup */}
      {error && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md flex items-center gap-4">
            <MdError className="text-2xl text-red-600" />
            <p className="text-lg text-red-600">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMonitor;
