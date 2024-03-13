import React from 'react';
import Nav from '../components/Nav';
import AuthModel from '../components/AuthModel';
import { useState } from 'react';



export default function Home() {

    const [showModel, setShowModel] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

    const authToken = false;

    const handleClick = () => {
        setShowModel(true)
        setIsSignUp(true)
  };

  return (
    <div className='overlay'>
      <Nav 
      minimal={false} 
      authToken={authToken} 
      setShowModel={setShowModel} 
      showModel={showModel}
      setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">Swipe Right™️</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? 'Sign Out' : 'Create Account'}
        </button>
        {showModel && (
            <AuthModel setShowModel={setShowModel}  isSignUp={isSignUp}/>
        )}
      </div>
    </div>
 
  );
}
