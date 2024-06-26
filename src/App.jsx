import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useCookies} from 'react-cookie'


    export default function App() {
      const [ cookies] = useCookies(['user'])

      const authToken = cookies.AuthToken
      return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {authToken && <Route path="/dashboard" element={<Dashboard  />}/>}
          {authToken && <Route path="/Onboarding" element={<Onboarding  />} />}
        
        </Routes>
        </BrowserRouter>
      );
    }
  

