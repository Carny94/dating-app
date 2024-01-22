import React from 'react';
import Nav from '../components/Nav';
import AuthModel from '../components/AuthModel';
import { useState } from 'react';



export default function Home() {

    const [showModel, setShowModel] = useState(false);

    const authToken = false;


    const handleClick = () => {
       
        setShowModel(true)
  };

  return (
    <>
    <div className='overlay'>
      <Nav minimal={false} authToken={authToken} setShowModel={setShowModel}/>
      <div className="home">
        <h1>Swipe Right™️</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? 'Sign Out' : 'Create Account'}
        </button>
        {showModel && (
            <AuthModel setShowModel={setShowModel}/>
        )}
      </div>
    </div>
    </>
  );
}
