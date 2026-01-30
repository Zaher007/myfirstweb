// script.js - COMPLETE with language switcher
console.log('🎉 My Personal Website - Ready!');
console.log('✨ All files loaded successfully');

// ===== LANGUAGE SYSTEM =====
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Function to update all text content
function updatePageContent() {
    const langData = languageData[currentLanguage];
    if (!langData) return;
    
    // Update elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (langData[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = langData[key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = langData[key];
            } else if (element.hasAttribute('title')) {
                element.title = langData[key];
            } else {
                element.textContent = langData[key];
            }
        }
    });
    
    // Update page title based on current page
    const pageName = document.body.id || 'home';
    if (langData[`${pageName}Title`]) {
        document.title = langData[`${pageName}Title`];
    }
    
    // Update date display if exists
    updateDateTime();
    
    // Update direction based on language
    updateDirection();
}

// Update direction (LTR for English, RTL for Arabic)
function updateDirection() {
    if (currentLanguage === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        document.body.style.direction = 'rtl';
        document.body.style.textAlign = 'right';
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        document.body.style.direction = 'ltr';
        document.body.style.textAlign = 'left';
    }
}

// Update language switcher display
function updateNavLanguageSwitcher() {
    const currentFlag = document.getElementById('currentFlag');
    const currentLang = document.getElementById('currentLang');
    
    if (currentFlag) {
        currentFlag.textContent = currentLanguage === 'ar' ? '🇸🇦' : '🇺🇸';
    }
    
    if (currentLang) {
        currentLang.textContent = currentLanguage === 'ar' ? 'العربية' : 'English';
    }
    
    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(option => {
        const lang = option.onclick.toString().includes("'ar'") ? 'ar' : 'en';
        option.classList.toggle('active', lang === currentLanguage);
    });
}

// MAIN LANGUAGE CHANGE FUNCTION
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    
    // Close dropdown
    const navLanguage = document.getElementById('navLanguage');
    if (navLanguage) navLanguage.classList.remove('open');
    
    // Update all content
    updatePageContent();
    updateNavLanguageSwitcher();
    
    console.log(`🌍 Language changed to: ${lang}`);
}

// Toggle language dropdown
function toggleLanguageDropdown() {
    const navLanguage = document.getElementById('navLanguage');
    if (navLanguage) {
        navLanguage.classList.toggle('open');
    }
}

// Close dropdown when clicking outside
function setupDropdownClose() {
    document.addEventListener('click', function(event) {
        const navLanguage = document.getElementById('navLanguage');
        if (navLanguage && !navLanguage.contains(event.target)) {
            navLanguage.classList.remove('open');
        }
    });
}

// Initialize language system
function initLanguageSystem() {
    updatePageContent();
    updateNavLanguageSwitcher();
    updateDirection();
    setupDropdownClose();
    
    console.log(`🌍 Language initialized: ${currentLanguage}`);
}

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
    const langData = languageData[currentLanguage];
    
    // Format time based on language
    let timeStr;
    if (currentLanguage === 'ar') {
        timeStr = now.toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    } else {
        timeStr = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }
    
    // Format date based on language
    let dateStr;
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    if (currentLanguage === 'ar') {
        dateStr = now.toLocaleDateString('ar-SA', dateOptions);
    } else {
        dateStr = now.toLocaleDateString('en-US', dateOptions);
    }
    
    // Update elements if they exist
    const currentTime = document.getElementById('current-time');
    const currentDate = document.getElementById('current-date');
    const systemTime = document.getElementById('systemTime');
    
    if (currentTime) currentTime.textContent = timeStr;
    if (currentDate) currentDate.textContent = dateStr;
    if (systemTime) systemTime.innerHTML = `<i class="far fa-clock"></i> ${langData.systemTime || 'Time:'} ${timeStr}`;
    
    // Update today's date in footer
    const todayElement = document.querySelector('[data-lang="today"]');
    if (todayElement && langData.today) {
        todayElement.textContent = langData.today + dateStr;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language system
    initLanguageSystem();
    
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
    getVisitCount: () => localStorage.getItem('visitCount') || 0,
    getCurrentLanguage: () => currentLanguage,
    changeLanguage
};

// Load completion message
window.addEventListener('load', function() {
    console.log('✅ Website fully loaded');
    console.log('💡 Try in console: siteFunctions.showAlert("Hello!")');
    console.log('🌍 Current language:', currentLanguage);
});

// Utility function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}