import React, { useState } from 'react';
import { signup } from '../../service/Service.jsx';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Store the error as a string or null
  const navigate = useNavigate();

  const handleSignup = async () => {
    const userRequest = {
      email: email,
      password: password,
    };

    signup(userRequest)
      .then((response) => {
        // Redirect to the login page after successful signup
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        const errorMessage = err.response.data;
        setError(errorMessage);
      });
  };

  const handleGoogleLogin = async () => {
    window.location.href = 'Http://localhost:8080/oauth2/authorization/google';
  };
  const handleGithubLogin = async () => {
    window.location.href = 'Http://localhost:8080/oauth2/authorization/github';
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-cool-animation"></div>
      <div className="relative flex flex-col items-center justify-center max-w-5xl h-screen w-full">
        <div className="absolute top-4 left-4">
          <a href="/public" className="flex items-center text-white hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
              className="mr-2"
            >
              <path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z" />
            </svg>
            back
          </a>
        </div>
        <div className="relative flex flex-col gap-4 p-7 border border-neutral-500 rounded-xl z-10">
          <div>
            <p className="pl-1 mb-2 text-neutral-300">Sign Up</p>
          </div>


          <div>
            <div className="h-3">
              {error && error.email && <p className="text-sm text-red-500">{error.email}</p>}
            </div>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 bg-transparent border-b border-neutral-500 text-neutral-200 w-full focus:border-neutral-400 placeholder-neutral-500 focus:outline-none"
            />
          </div>


          <div>
            <div className='h-3'>
              {error && error.password && <p className="text-sm text-red-500">{error.password}</p>}
            </div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 bg-transparent border-b border-neutral-500 text-neutral-200 w-full focus:border-neutral-400 placeholder-neutral-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleSignup}
            className="bg-green-700 hover:bg-green-600 hover:text-neutral-200 text-neutral-300 font-bold py-2 px-4 rounded w-full"
          >
            Create Account
          </button>

          <div className=''>
            <div className='text-neutral-300  flex mt-4 mb-9 items-center justify-center'>
              <hr className='w-1/2 mt-1 border-neutral-500' />
              <p className='mx-2'>or</p>
              <hr className='w-1/2 mt-1 border-neutral-500' />
            </div>
            <div className='flex flex-col gap-2'>
              <button onClick={handleGoogleLogin} className='items-center text-neutral-700 flex  rounded-md bg-white w-full p-2'>
                <svg className='absolute' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                <p className='px-16 font-bold text-center flex-grow text-sm font-sans'>Sign in with Google</p>
              </button>
              <button onClick={handleGithubLogin} className='items-center text-neutral-100 flex  rounded-md bg-neutral-900 w-full p-2'>
                <svg className='absolute' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" fill="currentColor" viewBox="0 0 50 50">
                  <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                </svg>
                <p className='px-16 font-bold text-center flex-grow text-sm font-sans'>Sign in with Github</p>
              </button>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm text-neutral-500 mr-1">Already have an account? </span>
            <a href="/login" className="text-neutral-300 hover:text-neutral-50">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
