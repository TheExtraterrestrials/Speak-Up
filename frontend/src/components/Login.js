import React from 'react';
import './Login.css';
import { auth, googleProvider, githubProvider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Successfully signed in
        console.log('Google Sign-In successful:', result.user);
        navigate('/home');
      })
      .catch((error) => {
        console.error('Google Sign-In error:', error);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // Successfully signed in
        console.log('GitHub Sign-In successful:', result.user);
        navigate('/home');
      })
      .catch((error) => {
        console.error('GitHub Sign-In error:', error);
      });
  };

  return (
    <div className='container'>
      <form className="form">
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="0 0 32 32"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
            </g>
          </svg>
          <input type="text" className="input" placeholder="Enter your Email" />
        </div>

        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="-64 0 512 512"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
          </svg>
          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
          />
          <svg
            viewBox="0 0 576 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
          </svg>
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me </label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button className="button-submit">Sign In</button>

        <p className="p line">Or With</p>
        <div className="flex-row">
          {/* Google Sign-In Button */}
          <button type="button" className="btn google" onClick={handleGoogleSignIn}>
            <img src="data:image/jpeg;base64,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" alt="Google logo" width="20" /> Google
          </button>
          
          {/* GitHub Sign-In Button */}
          <button type="button" className="btn github" onClick={handleGithubSignIn}>
            <svg
              version="1.1"
              width="20"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              style={{ enableBackground: "new 0 0 32 32" }}
            >
              <path d="M16 0.396c-8.837 0-16 7.16-16 16 0 7.068 4.584 13.065 10.943 15.185 0.8 0.146 1.093-0.348 1.093-0.772 0-0.382-0.014-1.393-0.022-2.733-4.451 0.967-5.391-2.145-5.391-2.145-0.727-1.85-1.776-2.343-1.776-2.343-1.451-0.993 0.11-0.973 0.11-0.973 1.605 0.113 2.45 1.65 2.45 1.65 1.427 2.445 3.743 1.739 4.654 1.33 0.145-1.033 0.559-1.739 1.016-2.14-3.553-0.404-7.288-1.776-7.288-7.909 0-1.747 0.623-3.175 1.647-4.293-0.164-0.405-0.713-2.035 0.156-4.245 0 0 1.34-0.43 4.394 1.64 1.273-0.354 2.64-0.53 4.005-0.538 1.365 0.008 2.732 0.184 4.006 0.538 3.053-2.071 4.392-1.64 4.392-1.64 0.87 2.21 0.322 3.84 0.158 4.245 1.024 1.118 1.646 2.546 1.646 4.293 0 6.145-3.739 7.501-7.299 7.898 0.576 0.498 1.089 1.476 1.089 2.977 0 2.146-0.02 3.878-0.02 4.404 0 0.427 0.29 0.923 1.104 0.767 6.354-2.118 10.931-8.116 10.931-15.18 0-8.838-7.162-16-16-16z"/>
            </svg>
            GitHub
          </button>
        </div>
      </form>
    </div>
  );
}
