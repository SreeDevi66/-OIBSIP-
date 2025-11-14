// Task Manager Class
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.editingTaskId = null;
        this.init();
    }

    // Initialize the app
    init() {
        this.cacheDOMElements();
        this.attachEventListeners();
        this.renderTasks();
        this.updateTaskCount();
    }

    // Cache DOM elements
    cacheDOMElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.tasksContainer = document.getElementById('tasksContainer');
        this.emptyState = document.getElementById('emptyState');
        this.taskCount = document.getElementById('taskCount');
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.editModal = document.getElementById('editModal');
        this.editTaskInput = document.getElementById('editTaskInput');
        this.saveEditBtn = document.getElementById('saveEditBtn');
        this.cancelEditBtn = document.getElementById('cancelEditBtn');
        this.closeModalBtn = document.querySelector('.close');
    }

    // Attach event listeners
    attachEventListeners() {
        // Add task
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter tabs
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterTasks(e.target.dataset.filter));
        });

        // Clear completed
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompletedTasks());

        // Modal events
        this.saveEditBtn.addEventListener('click', () => this.saveEdit());
        this.cancelEditBtn.addEventListener('click', () => this.closeModal());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        
        // Close modal on outside click
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) this.closeModal();
        });

        // Edit modal enter key
        this.editTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveEdit();
        });
    }

    // Load tasks from localStorage
    loadTasks() {
        const tasksJSON = localStorage.getItem('tasks');
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Add new task
    addTask() {
        const taskText = this.taskInput.value.trim();
        
        if (taskText === '') {
            this.showError('Please enter a task!');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.tasks.unshift(newTask);
        this.saveTasks();
        this.taskInput.value = '';
        this.renderTasks();
        this.updateTaskCount();
        this.showSuccess('Task added successfully!');
    }

    // Toggle task completion
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveTasks();
            this.renderTasks();
            this.updateTaskCount();
        }
    }

    // Open edit modal
    openEditModal(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.editingTaskId = id;
            this.editTaskInput.value = task.text;
            this.editModal.classList.add('show');
            this.editTaskInput.focus();
        }
    }

    // Close edit modal
    closeModal() {
        this.editModal.classList.remove('show');
        this.editingTaskId = null;
        this.editTaskInput.value = '';
    }

    // Save edited task
    saveEdit() {
        const newText = this.editTaskInput.value.trim();
        
        if (newText === '') {
            this.showError('Task cannot be empty!');
            return;
        }

        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (task) {
            task.text = newText;
            this.saveTasks();
            this.renderTasks();
            this.closeModal();
            this.showSuccess('Task updated successfully!');
        }
    }

    // Delete task
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.renderTasks();
            this.updateTaskCount();
            this.showSuccess('Task deleted successfully!');
        }
    }

    // Filter tasks
    filterTasks(filter) {
        this.currentFilter = filter;
        
        // Update active tab
        this.tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        this.renderTasks();
    }

    // Get filtered tasks
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    // Clear completed tasks
    clearCompletedTasks() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            this.showError('No completed tasks to clear!');
            return;
        }

        if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.renderTasks();
            this.updateTaskCount();
            this.showSuccess('Completed tasks cleared!');
        }
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

    // Render tasks
    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            this.tasksContainer.innerHTML = '';
            this.emptyState.classList.remove('hidden');
            return;
        }

        this.emptyState.classList.add('hidden');
        
        this.tasksContainer.innerHTML = filteredTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="taskManager.toggleTask(${task.id})"
                >
                <div class="task-content">
                    <div class="task-text">${this.escapeHtml(task.text)}</div>
                    <div class="task-meta">
                        <span class="task-time">
                            📅 Created: ${this.formatDateTime(task.createdAt)}
                        </span>
                        ${task.completedAt ? `
                            <span class="task-time">
                                ✅ Completed: ${this.formatDateTime(task.completedAt)}
                            </span>
                        ` : ''}
                        <span class="status-badge ${task.completed ? 'completed' : 'pending'}">
                            ${task.completed ? 'Completed' : 'Pending'}
                        </span>
                    </div>
                </div>
                <div class="task-actions">
                    <button 
                        class="btn-icon-only btn-edit" 
                        onclick="taskManager.openEditModal(${task.id})"
                        title="Edit task"
                    >
                        ✏️
                    </button>
                    <button 
                        class="btn-icon-only btn-delete" 
                        onclick="taskManager.deleteTask(${task.id})"
                        title="Delete task"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Update task count
    updateTaskCount() {
        const total = this.tasks.length;
        const pending = this.tasks.filter(t => !t.completed).length;
        const completed = this.tasks.filter(t => t.completed).length;
        
        this.taskCount.textContent = `Total Tasks: ${total} | Pending: ${pending} | Completed: ${completed}`;
        
        // Enable/disable clear button
        this.clearCompletedBtn.disabled = completed === 0;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Show success message
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    // Show error message
    showError(message) {
        this.showNotification(message, 'error');
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
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#4caf50' : '#f44336'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 2000;
            animation: slideInRight 0.3s ease;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
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

// Initialize the app
const taskManager = new TaskManager();
