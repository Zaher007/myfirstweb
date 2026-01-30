// script.js - Main JavaScript for website functionality
console.log('🎉 My Personal Website - Ready!');
console.log('✨ All files loaded successfully');

// ===== GENERAL WEBSITE FUNCTIONS =====
// Track mouse movement
document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    
    document.body.style.background = `
        radial-gradient(circle at ${x}% ${y}%, 
        #f5f7fa 0%, 
        #c3cfe2 100%)
    `;
});

// Update date and time
function updateDateTime() {
    const now = new Date();
    
    // Format time
    const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    // Format date
    const dateStr = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Update elements if they exist
    const currentTime = document.getElementById('current-time');
    const currentDate = document.getElementById('current-date');
    const systemTime = document.getElementById('systemTime');
    
    if (currentTime) currentTime.textContent = timeStr;
    if (currentDate) currentDate.textContent = dateStr;
    if (systemTime) systemTime.innerHTML = `<i class="far fa-clock"></i> Time: ${timeStr}`;
    
    // Update today's date in footer
    const todayElement = document.getElementById('today');
    if (todayElement) {
        todayElement.textContent = 'Today: ' + dateStr;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update date and time
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Simple visitor counter
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    // Update visitor count if element exists
    const visitorElement = document.getElementById('visitors');
    if (visitorElement) {
        visitorElement.textContent = visitCount;
    }
    
    console.log(`👀 Visit count: ${visitCount}`);
    
    // Add theme changer button
    const addButton = document.createElement('button');
    addButton.id = 'theme-changer';
    addButton.innerHTML = '🎨';
    addButton.title = 'Change Theme';
    
    addButton.addEventListener('click', function() {
        const themes = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.background = randomTheme;
        }
    });
    
    document.body.appendChild(addButton);
});

// Helper functions
function showAlert(message) {
    alert(`🔔 ${message}`);
}

function changeTitle(newTitle) {
    document.title = newTitle;
    return `Title changed to: ${newTitle}`;
}

// Export functions for console use
window.siteFunctions = {
    showAlert,
    changeTitle,
    getVisitCount: () => localStorage.getItem('visitCount') || 0
};

// Load completion message
window.addEventListener('load', function() {
    console.log('✅ Website fully loaded');
    console.log('💡 Try in console: siteFunctions.showAlert("Hello!")');
});

// Utility function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to create loading spinner
function createSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<i class="fas fa-spinner"></i>';
    return spinner;
}