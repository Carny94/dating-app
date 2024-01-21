import React from 'react';
import Nav from '../components/Nav';

export default function Home() {
  const authToken = true;

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <>
      <Nav />
      <div className="home">
        <h1>Swipe Right™️</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? 'Sign Out' : 'Create Account'}
        </button>
      </div>
    </>
  );
}
