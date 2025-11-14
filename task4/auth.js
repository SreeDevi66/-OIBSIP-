// Authentication System Class
class AuthSystem {
    constructor() {
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.checkAutoLogin();
    }

    // Attach event listeners
    attachEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const registerPassword = document.getElementById('registerPassword');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        if (registerPassword) {
            registerPassword.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));
        }
    }

    // Check if user should be auto-logged in
    checkAutoLogin() {
        const rememberMe = localStorage.getItem('rememberMe');
        const currentUser = localStorage.getItem('currentUser');

        if (rememberMe === 'true' && currentUser) {
            // Auto-login
            window.location.href = 'dashboard.html';
        }
    }

    // Handle user registration
    handleRegister(event) {
        event.preventDefault();

        // Clear previous errors
        this.clearErrors();

        // Get form values
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate inputs
        if (!this.validateRegister(name, email, password, confirmPassword)) {
            return;
        }

        // Check if user already exists
        const users = this.getUsers();
        if (users.find(u => u.email === email)) {
            this.showError('registerEmailError', 'Email already registered!');
            this.showNotification('Email already exists. Please login.', 'error');
            return;
        }

        // Hash password (simple hash for demo - use bcrypt in production)
        const hashedPassword = this.hashPassword(password);

        // Create user object
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            loginCount: 0,
            lastLogin: null
        };

        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Show success and redirect to login
        this.showNotification('Registration successful! Please login.', 'success');
        setTimeout(() => {
            this.showLogin();
        }, 1500);
    }

    // Handle user login
    handleLogin(event) {
        event.preventDefault();

        // Clear previous errors
        this.clearErrors();

        // Get form values
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Validate inputs
        if (!email || !password) {
            if (!email) this.showError('loginEmailError', 'Email is required');
            if (!password) this.showError('loginPasswordError', 'Password is required');
            return;
        }

        // Get users
        const users = this.getUsers();
        const hashedPassword = this.hashPassword(password);

        // Find user
        const user = users.find(u => u.email === email && u.password === hashedPassword);

        if (!user) {
            this.showError('loginPasswordError', 'Invalid email or password');
            this.showNotification('Login failed. Please check your credentials.', 'error');
            return;
        }

        // Update user login info
        user.loginCount = (user.loginCount || 0) + 1;
        user.lastLogin = new Date().toISOString();

        // Save updated user data
        const userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));

        // Set current user and remember me
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('rememberMe', rememberMe);

        // Show success and redirect
        this.showNotification('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }

    // Validate registration inputs
    validateRegister(name, email, password, confirmPassword) {
        let isValid = true;

        // Validate name
        if (!name || name.length < 2) {
            this.showError('registerNameError', 'Name must be at least 2 characters');
            isValid = false;
        }

        // Validate email
        if (!this.isValidEmail(email)) {
            this.showError('registerEmailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (password.length < 6) {
            this.showError('registerPasswordError', 'Password must be at least 6 characters');
            isValid = false;
        }

        // Validate confirm password
        if (password !== confirmPassword) {
            this.showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }

        return isValid;
    }

    // Check password strength
    checkPasswordStrength(password) {
        const strengthIndicator = document.getElementById('passwordStrength');
        
        if (!password) {
            strengthIndicator.className = 'password-strength';
            return;
        }

        let strength = 0;
        
        // Check length
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        
        // Check for numbers
        if (/\d/.test(password)) strength++;
        
        // Check for special characters
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
        
        // Check for uppercase and lowercase
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;

        // Set strength class
        if (strength <= 2) {
            strengthIndicator.className = 'password-strength weak';
        } else if (strength <= 3) {
            strengthIndicator.className = 'password-strength medium';
        } else {
            strengthIndicator.className = 'password-strength strong';
        }
    }

    // Simple password hashing (use bcrypt in production)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Get all users from localStorage
    getUsers() {
        const usersJSON = localStorage.getItem('users');
        return usersJSON ? JSON.parse(usersJSON) : [];
    }

    // Show error message
    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Clear all error messages
    clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
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

// UI Functions
function showRegister() {
    document.getElementById('loginBox').classList.add('hidden');
    document.getElementById('registerBox').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('registerBox').classList.add('hidden');
    document.getElementById('loginBox').classList.remove('hidden');
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
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

// Initialize authentication system
const authSystem = new AuthSystem();