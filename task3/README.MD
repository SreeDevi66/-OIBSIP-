To-Do List Web App
A modern, feature-rich to-do list application that helps you organize and manage your daily tasks efficiently. Built with vanilla JavaScript, HTML5, and CSS3, this app provides a clean and intuitive interface for task management.
🎯 Project Overview
This to-do web app enables users to add, edit, delete, and organize their daily tasks with ease. It features a beautiful gradient design, smooth animations, and persistent storage to keep your tasks saved even after closing the browser.
✨ Key Features
Core Functionality

Add Tasks: Quickly add new tasks with a simple input field and button
Edit Tasks: Modify existing tasks through a modal dialog interface
Delete Tasks: Remove tasks with confirmation prompt
Mark Complete: Check off tasks as you complete them
Task Filtering: View All, Pending, or Completed tasks with tab navigation
Clear Completed: Bulk delete all completed tasks at once

Advanced Features

Date & Time Tracking: Automatically records when tasks are created and completed
Task Counter: Real-time display of total, pending, and completed task counts
Local Storage: Tasks persist across browser sessions
Status Badges: Visual indicators showing task status (Pending/Completed)
Empty State: Helpful message when no tasks are available
Responsive Design: Works seamlessly on desktop, tablet, and mobile devices

User Experience

Toast Notifications: Success and error messages for user actions
Smooth Animations: Task additions, deletions, and transitions
Keyboard Support: Press Enter to add/edit tasks quickly
Input Validation: Prevents empty tasks from being added
Confirmation Dialogs: Prevents accidental deletions
Character Limit: Maximum 200 characters per task

🛠️ Technologies Used

HTML5: Semantic markup and structure
CSS3: Modern styling with gradients, animations, and flexbox
Vanilla JavaScript: ES6+ classes, localStorage API, DOM manipulation
Google Fonts: Poppins font family for clean typography

📂 File Structure
todo-app/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── script.js           # Task management logic and functionality
└── README.md          # Project documentation
🚀 How to Use

Clone or download all three files (index.html, styles.css, script.js)
Ensure all files are in the same directory
Open index.html in any modern web browser
Start adding your tasks!

No installation, dependencies, or build process required!
📱 Features Breakdown
Task Management

Visible Task List: All added tasks appear immediately in the list
Pending Tasks Section: Filter to view only incomplete tasks
Completed Tasks Section: Filter to view only finished tasks
All Tasks View: Default view showing complete task union

Task Operations

Add: Enter task text and click "Add Task" or press Enter
Complete: Click checkbox to mark task as done (moves to completed list)
Edit: Click edit icon (✏️) to modify task text in modal
Delete: Click delete icon (🗑️) to remove task with confirmation

Data Persistence

Tasks automatically saved to browser's localStorage
Survives page refreshes and browser restarts
Each task stores: ID, text, completion status, creation time, completion time

🎨 Design Highlights

Purple Gradient Theme: Eye-catching color scheme throughout
Card-Based Layout: Clean, modern task cards
Hover Effects: Interactive elements respond to user actions
Modal Dialog: Professional edit interface
Status Indicators: Color-coded badges for task status
Timestamp Display: Shows creation and completion dates

💡 How It Works
The app follows these principles:

Task Addition: New tasks appear at the top of the list
Three Views:

All Tasks = Pending + Completed (union of both lists)
Pending Tasks = Only unchecked items
Completed Tasks = Only checked items


Task Editing: Available from any view/list
Task Deletion: Can delete from any view/list
Timestamps: Automatically added when task is created/completed

🌐 Browser Compatibility
Works on all modern browsers:

Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)

📱 Responsive Features

Desktop: Full-width layout with side-by-side elements
Tablet/Mobile: Stacked layouts with touch-friendly buttons
Adaptive Tabs: Vertical tabs on smaller screens

🎓 Learning Outcomes
This project demonstrates:

DOM manipulation and event handling
LocalStorage API for data persistence
ES6 classes and modern JavaScript
Modal dialog implementation
Filter and search functionality
Dynamic UI updates
Form validation
Responsive web design

🔧 Customization
Easy to modify:

Change color scheme in CSS gradient values
Adjust task character limit in HTML
Modify notification duration in JavaScript
Add additional task properties (priority, category, etc.)
Implement search functionality
Add task sorting options

📄 License
This project is open source and available under the MIT License.
