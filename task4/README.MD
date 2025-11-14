A full-featured authentication system that allows users to create accounts, securely login, and access a protected dashboard area. The system includes password hashing, session management, and user profile features.
✨ Key Features
Authentication

User Registration - Create new accounts with email and password
Secure Login - Access accounts with credential validation
Password Hashing - Passwords are hashed before storage (never stored in plain text)
Remember Me - Optional persistent login sessions
Auto-Login - Automatic login for remembered users

Security Features

Password Strength Indicator - Real-time password strength visualization
Input Validation - Email format and password requirements
Protected Routes - Secured dashboard accessible only after login
Session Management - Tracks user sessions and login attempts
Duplicate Prevention - Prevents registration with existing emails

User Dashboard

Profile Information - Display user details and account status
Activity Statistics - Track total logins, last login, and session time
Account Management - Update profile, change password, view activity
Secure Logout - Clear session and return to login page
Account Deletion - Permanent account removal with confirmation

UI/UX Features

Password Toggle - Show/hide password visibility
Toast Notifications - Success and error messages
Smooth Animations - Modern transitions and effects
Responsive Design - Works on all devices
Form Validation - Real-time error messages

🛠️ Technologies Used

HTML5 - Structure and semantic markup
CSS3 - Styling with gradients and animations
Vanilla JavaScript - ES6+ classes and localStorage API
LocalStorage - Client-side data persistence

📂 File Structure
login-auth-system/
│
├── index.html          # Login and registration page
├── dashboard.html      # Protected dashboard page
├── styles.css          # Complete styling for both pages
├── auth.js            # Authentication logic (register/login)
├── dashboard.js       # Dashboard functionality
└── README.md          # Project documentation
How to Use

Download all files and place them in the same directory
Open index.html in a web browser
Register a new account or Login if already registered
Access the secured dashboard after successful authentication

No server, database, or dependencies required!
📱 System Workflow

Registration: User creates account → Data stored in localStorage
Login: User enters credentials → Validation → Access granted
Dashboard: View profile, statistics, and manage account
Logout: Clear session → Return to login page

🔐 Security Implementation

Password hashing using JavaScript hash function
Email format validation with regex
Minimum password length requirement (6 characters)
Session authentication check on dashboard
Confirmation dialogs for critical actions
Protection against XSS and duplicate registrations

💾 Data Storage
All user data is stored in browser's localStorage:

users - Array of registered users
currentUser - Currently logged-in user
rememberMe - Auto-login preference

🎨 Pages Included
Login/Register Page (index.html)

Toggle between login and registration forms
Email and password input fields
Password strength indicator (register only)
Remember me checkbox
Form validation and error messages

Dashboard Page (dashboard.html)

Navigation bar with user greeting
Profile information cards
Account statistics display
Feature showcase section
Quick actions (update profile, change password, delete account)
Session timer

📊 Dashboard Features

Profile Display - Name, email, join date, account status
Statistics - Login count, last login time, session duration
Quick Actions - Update name, change password, view activity log
Account Management - Secure account deletion with double confirmation

🌐 Browser Compatibility
Tested and working on:

Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)

📱 Responsive Design

Mobile-friendly layouts
Touch-optimized buttons
Adaptive form layouts
Responsive navigation

📄 License
Open source project available under the MIT License.
