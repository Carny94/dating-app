import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useCookies} from 'react-cookie'
import { matches } from './pages/Onboarding'
import { useState } from 'react';


    export default function App() {
      const [ cookies] = useCookies(['user'])
      const [matches, setMatches] = useState([]);


      const authToken = cookies.AuthToken
      return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {authToken && <Route path="/dashboard" element={<Dashboard matches={matches} />}/>}
          {authToken && <Route path="/Onboarding" element={<Onboarding matches={matches} />} />}
          

        </Routes>
        </BrowserRouter>
      );
    }
  

