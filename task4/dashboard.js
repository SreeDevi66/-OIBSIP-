// Dashboard Manager Class
class DashboardManager {
    constructor() {
        this.sessionStartTime = Date.now();
        this.init();
    }

    init() {
        // Check if user is logged in
        if (!this.checkAuth()) {
            window.location.href = 'index.html';
            return;
        }

        this.loadUserData();
        this.startSessionTimer();
    }

    // Check if user is authenticated
    checkAuth() {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser !== null;
    }

    // Load user data and display
    loadUserData() {
        const userJSON = localStorage.getItem('currentUser');
        
        if (!userJSON) {
            window.location.href = 'index.html';
            return;
        }

        const user = JSON.parse(userJSON);

        // Update welcome message
        const userWelcome = document.getElementById('userWelcome');
        if (userWelcome) {
            userWelcome.textContent = `Welcome, ${user.name}!`;
        }

        // Update profile information
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = user.name;
        }

        const userEmail = document.getElementById('userEmail');
        if (userEmail) {
            userEmail.textContent = user.email;
        }

        const memberSince = document.getElementById('memberSince');
        if (memberSince) {
            memberSince.textContent = this.formatDate(user.createdAt);
        }

        // Update statistics
        const loginCount = document.getElementById('loginCount');
        if (loginCount) {
            loginCount.textContent = user.loginCount || 0;
        }

        const lastLogin = document.getElementById('lastLogin');
        if (lastLogin && user.lastLogin) {
            lastLogin.textContent = this.formatDateTime(user.lastLogin);
        }
    }

    // Start session timer
    startSessionTimer() {
        setInterval(() => {
            const sessionTime = Math.floor((Date.now() - this.sessionStartTime) / 1000 / 60);
            const sessionTimeElement = document.getElementById('sessionTime');
            if (sessionTimeElement) {
                sessionTimeElement.textContent = `${sessionTime}m`;
            }
        }, 60000); // Update every minute
    }

    // Format date
    formatDate(isoString) {
        const date = new Date(isoString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Format date and time
    formatDateTime(isoString) {
        const date = new Date(isoString);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }

    // Show notification
    showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear current user but keep registered users
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = 'Logged out successfully!';
        document.body.appendChild(notification);

        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Update Profile function
function showUpdateProfile() {
    const userJSON = localStorage.getItem('currentUser');
    const user = JSON.parse(userJSON);
    
    const newName = prompt('Enter your new name:', user.name);
    
    if (newName && newName.trim() !== '') {
        user.name = newName.trim();
        
        // Update in currentUser
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Update in users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex].name = user.name;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Reload page to show changes
        dashboardManager.showNotification('Profile updated successfully!', 'success');
        setTimeout(() => location.reload(), 1000);
    }
}

// Change Password function
function showChangePassword() {
    const currentPassword = prompt('Enter your current password:');
    
    if (!currentPassword) return;
    
    const newPassword = prompt('Enter your new password (min 6 characters):');
    
    if (!newPassword || newPassword.length < 6) {
        dashboardManager.showNotification('Password must be at least 6 characters!', 'error');
        return;
    }
    
    const confirmPassword = prompt('Confirm your new password:');
    
    if (newPassword !== confirmPassword) {
        dashboardManager.showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Hash passwords
    const hashPassword = (password) => {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    };
    
    const userJSON = localStorage.getItem('currentUser');
    const user = JSON.parse(userJSON);
    
    // Verify current password
    if (hashPassword(currentPassword) !== user.password) {
        dashboardManager.showNotification('Current password is incorrect!', 'error');
        return;
    }
    
    // Update password
    user.password = hashPassword(newPassword);
    
    // Update in currentUser
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex].password = user.password;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    dashboardManager.showNotification('Password changed successfully!', 'success');
}

// View Activity function
function viewActivity() {
    const userJSON = localStorage.getItem('currentUser');
    const user = JSON.parse(userJSON);
    
    const activityInfo = `
Account Activity:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Total Logins: ${user.loginCount || 0}
📅 Account Created: ${dashboardManager.formatDate(user.createdAt)}
🕒 Last Login: ${user.lastLogin ? dashboardManager.formatDateTime(user.lastLogin) : 'Never'}
⏱️ Current Session: ${Math.floor((Date.now() - dashboardManager.sessionStartTime) / 1000 / 60)} minutes
    `;
    
    alert(activityInfo);
}

// Delete Account function
function deleteAccount() {
    const confirmation = confirm('⚠️ WARNING: This will permanently delete your account!\n\nAre you absolutely sure you want to continue?');
    
    if (!confirmation) return;
    
    const finalConfirmation = prompt('Type "DELETE" to confirm account deletion:');
    
    if (finalConfirmation !== 'DELETE') {
        dashboardManager.showNotification('Account deletion cancelled.', 'error');
        return;
    }
    
    // Get current user
    const userJSON = localStorage.getItem('currentUser');
    const user = JSON.parse(userJSON);
    
    // Remove user from users array
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(u => u.id !== user.id);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Clear current user
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    
    // Show notification and redirect
    alert('Your account has been deleted successfully.');
    window.location.href = 'index.html';
}

// Add slideOutRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize dashboard
const dashboardManager = new DashboardManager();