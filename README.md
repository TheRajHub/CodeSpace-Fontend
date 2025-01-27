# Room Collaboration Platform

This Frontend of a is a real-time collaboration platform that allows users to create or join rooms for live coding, chat, and interaction. The application leverages React, Socket.io, and CSS modules to provide an intuitive and interactive experience for users.
The Code of the backend is here: <a href="https://github.com/TheRajHub/CodeSpace-Fontend.git">Backend</a>

## Features

- **Room Management**: Users can create or join rooms by entering their email and a room ID.
- **Real-Time Collaboration**: Rooms facilitate real-time communication and code sharing using Socket.io.
- **Live Code Editor**: Users can collaboratively write and edit code in real-time.
- **Dynamic Sidebar**: A collapsible sidebar allows users to navigate the application and leave rooms as needed.
- **File Management**: Users can select files to edit and view updates live as they are written.

## Workflow (User Perspective)

### 1. Landing on the Room Page
- When the user visits the application, they are presented with options to either **Create a Room** or **Join a Room**.
- **Create a Room**:
  - The user enters their email and clicks the "Submit" button.
  - A unique room ID is generated and shared with the backend using Socket.io.
  - The user is navigated to the collaboration page.
- **Join a Room**:
  - The user enters an existing room ID and their email.
  - Clicking "Submit" connects them to the corresponding room.

### 2. Navigating the Application
- After joining or creating a room, the user is directed to the main collaboration interface.
- The interface consists of:
  - **Sidebar**: A collapsible menu with options to leave the room.
  - **Main Content Area**: Displays the live code editor and other collaboration tools.

### 3. Real-Time Collaboration
- The live code editor allows users to edit files in real-time:
  - Users can select a file to edit by entering its name.
  - Updates are broadcasted to other users in the same room using Socket.io events (`write` and `code`).
- Changes made by one user are instantly visible to others.

### 4. Leaving the Room
- Users can leave the room using the "Leave Room" option in the sidebar.
- Upon leaving, the socket connection is disconnected, and the user is navigated back to the home page.

## File Structure Overview

- **RoomPage.js**:
  - Handles room creation and joining workflows.
  - Manages state for form type, room ID, and user email.
  - Utilizes Socket.io for server communication.

- **App.js**:
  - Acts as the main wrapper for the application.
  - Manages sidebar toggling and room exit functionality.

- **CodeEditor.js**:
  - Provides the live code editor interface.
  - Handles file selection and real-time code updates using Socket.io.

- **Context**:
  - `SocketContext.js`: Provides the socket instance to components.
  - `UserContext.js`: Manages user-related state and functionality.

- **CSS Modules**:
  - Styles are modularized for each component (e.g., `RoomPage.module.css`, `App.module.css`) to ensure scoped styling.

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/TheRajHub/CodeSpace-Fontend.git
   cd CodeSpace-Fontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Ensure the backend server with Socket.io is running setup the .env file according to that

## Technologies Used

- **Frontend**:
  - React 
  - CSS Modules

## Future Enhancements

- Solving the terminal-specific double execution problem.
- Enhance the file editor with syntax highlighting and language support.
- Add room-specific access controls.

