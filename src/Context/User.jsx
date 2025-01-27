import { useState } from 'react'
import UserContext from './UserContext'
function User({children}){
    const [users,setUsers]=useState([])
    function getuser(socket){
        if(!socket) return
        socket.on('user',(data)=>{
            setUsers(data)
        })
    }
    return(
        <UserContext.Provider value={{getuser,users}}>
            {children}
        </UserContext.Provider>
    )

}
export default User