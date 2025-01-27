import React, { useContext, useState ,useCallback, useEffect} from 'react';
import styles from './App.module.css';
import LeftSidebar from './LeftSidebar'
import MainContent from './MainContent'
import SocketContext from './Context/SocketContext';
import { useNavigate } from 'react-router-dom';
function App() {
  let socket=useContext(SocketContext)
  const navigate=useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const leaveRoom = () => {
    alert('You have left the room.');
    socket.disconnect()
    navigate("/")
  };
  return (
    <div className={styles.container}>
      <LeftSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        leaveRoom={leaveRoom}
      />
      <MainContent/>
    </div>
  );
}

export default App;
