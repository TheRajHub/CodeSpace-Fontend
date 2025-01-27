import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import RoomPage from './RoomPage.jsx'
import Socket from './Context/Socket.jsx'
import './main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './Context/User.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <User>
      <Socket>
        <Router>
          <Routes>
            <Route path='/' element={<RoomPage/>}/>
            <Route path='/2' element={<App/>}/>
          </Routes>
        </Router>
      </Socket>
    </User>
    
  </StrictMode>,
)
