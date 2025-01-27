import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './App.module.css'
import SocketContext from './Context/SocketContext';
import UserContext from './Context/UserContext'
function LeftSidebar({ isCollapsed, toggleSidebar, leaveRoom }) {
    const socket=useContext(SocketContext)
    const ref2=useRef()
    useEffect(()=>{
      if(!socket) return
      console.log("hello")
      socket.on('room',(data)=>{
        setRoom(data)
      })
    })
    
    const {getuser,users}=useContext(UserContext)
    const [room,setRoom]=useState('')

  
    return (
      <div className={`${styles.leftSidebar} ${isCollapsed ? styles.collapsed : ''}`}>
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          {isCollapsed ? '▶' : '◁'}
        </button>
        {!isCollapsed && (
          <>
  
            
              
              <h4 className={styles.userListHeader}>Room:</h4>
              <h4 
                className={styles.userListHeader} 
                onClick={() => navigator.clipboard.writeText(room)} 
                ref={ref2}
              >
                {room}
              </h4>
              <h4 className={styles.userListHeader}>Users are:</h4>
              {Array.isArray(users) && users.length > 0 ? (
                <ul className={styles.userListItems}>
                  {users.map((user, index) => (
                    <li key={index} className={styles.userItem}>{user}</li>
                  ))}
                </ul>
                ) : (
                  <p>No users yet</p>
              )}
              <button className={styles.leaveRoomBtn} onClick={leaveRoom}>Cut</button>
            
          </>
        )}
      </div>
      
    );
}
export default LeftSidebar