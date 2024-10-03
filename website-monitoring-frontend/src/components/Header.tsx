import React, { useState, useEffect, useRef } from 'react';
import { useUser, SignIn, SignUp, UserButton } from '@clerk/clerk-react';
import { FaStar } from 'react-icons/fa'; // Import star icon
import { Button } from './ui/Button';
import { toast } from 'react-toastify'; // Import toast for notifications
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Header: React.FC = () => {
  const { isSignedIn } = useUser();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); // State for feedback modal
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Handlers for opening modals
  const openSignIn = () => setIsSignInOpen(true);
  const openSignUp = () => setIsSignUpOpen(true);
  const openFeedback = () => setIsFeedbackOpen(true); // Open feedback modal

  // Handlers for navigation buttons
  const handleHomeClick = () => {
    if (isSignedIn) {
      navigate('/'); // Navigate to Home
    } else {
      openSignIn(); // Open Sign In modal if not signed in
    }
  };

  const handleCreateMonitorClick = () => {
    if (isSignedIn) {
      navigate('/create'); // Navigate to Create Monitor
    } else {
      openSignIn(); // Open Sign In modal if not signed in
    }
  };

  const handleMonitorClick = () => {
    if (isSignedIn) {
      navigate('/main'); // Navigate to Monitor
    } else {
      openSignIn(); // Open Sign In modal if not signed in
    }
  };

  const handleFeedbackClick = () => {
    if (isSignedIn) {
      openFeedback(); // Open feedback modal if signed in
    } else {
      openSignIn(); // Open Sign In modal if not signed in
    }
  };

  const handleSubmitFeedback = () => {
    // Feedback submission logic
    console.log('Feedback submitted:', feedback, rating);
    toast.success('Thank you for your feedback!'); // Display thank you message as a toast
    setIsFeedbackOpen(false); // Close the feedback modal after submission
    setFeedback(''); // Clear feedback form
    setRating(0); // Reset rating
  };

  // Click outside handler
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsSignInOpen(false);
      setIsSignUpOpen(false);
      setIsFeedbackOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mx-auto flex justify-between items-center p-5 shadow-lg">
      {/* Left side: Logo and navigation links */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => handleHomeClick()}>
          <img src="/logo.svg" alt="Logo" className="w-12 h-12" />
        </div>

        {/* Navigation links - only active when signed in */}
        <nav className="flex space-x-4 font-bold">
          <Button 
            variant='link' 
            onClick={handleHomeClick} 
            className={` ${!isSignedIn ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Home
          </Button>
          <Button 
            variant='link' 
            onClick={handleCreateMonitorClick} 
            className={` ${!isSignedIn ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Create Monitor
          </Button>
          <Button 
            variant='link' 
            onClick={handleMonitorClick} 
            className={` ${!isSignedIn ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Monitor
          </Button>
        </nav>
      </div>

      {/* Right side: User's profile picture or initials */}
      <div className="flex items-center space-x-1 font-bold">
        <Button variant='feedback' onClick={handleFeedbackClick}
        className={` ${!isSignedIn ? 'cursor-not-allowed opacity-50' : ''}`}
        >Feedback</Button>
        {!isSignedIn ? (
          <>
            <Button variant='signIn' onClick={openSignIn} className="py-2 px-4 rounded-lg cursor-pointer">Sign In</Button>
            <span className="text-black">/</span>
            <Button variant='signUp' onClick={openSignUp} className= "py-2 px-4 rounded-lg cursor-pointer">Sign Up</Button>
          </>
        ) : (
          <div className="pl-3"><UserButton /></div>
        )}
      </div>

      {/* Sign-In Modal */}
      {isSignInOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" ref={modalRef}>
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button
              onClick={() => setIsSignInOpen(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              &times;
            </button>
            <SignIn 
              afterSignInUrl={'/'}
            />
          </div>
        </div>
      )}

      {/* Sign-Up Modal */}
      {isSignUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" ref={modalRef}>
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button
              onClick={() => setIsSignUpOpen(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              &times;
            </button>
            <SignUp 
              afterSignUpUrl={'/'}
            />
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" ref={modalRef}>
          <div className="bg-white p-6 rounded shadow-lg relative w-96">
            <button onClick={() => setIsFeedbackOpen(false)} className="absolute top-2 right-2 text-gray-500">&times;</button>
            <h3 className="text-lg font-bold mb-4">Help us improve</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Your feedback here..."
              rows={4}
            ></textarea>
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={`cursor-pointer ${index < (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-400'}`}
                  onMouseEnter={() => setHoverRating(index + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(index + 1)}
                />
              ))}
            </div>
            <Button variant="default" onClick={handleSubmitFeedback}>Send</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
