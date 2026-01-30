// رسالة ترحيب في الكونسول
console.log('🎉 موقعي الشخصي - جاهز!');
console.log('✨ تم تحميل جميع الملفات بنجاح');

// متابعة حركة الماوس
document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    
    document.body.style.background = `
        radial-gradient(circle at ${x}% ${y}%, 
        #f5f7fa 0%, 
        #c3cfe2 100%)
    `;
});

// تأثيرات للصور
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // إضافة تأثير عند التمرير
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // إضافة عنوان للصورة
        img.title = img.alt || 'صورة في موقعي';
    });
    
    // إضافة تاريخ اليوم
    const today = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = today.toLocaleDateString('ar-EG', options);
    
    // إضافة التاريخ في التذييل إذا كان موجوداً
    const footer = document.querySelector('footer');
    if (footer) {
        const dateElement = document.createElement('p');
        dateElement.innerHTML = `📅 اليوم: <span class="highlight">${dateString}</span>`;
        dateElement.style.marginTop = '10px';
        dateElement.style.fontSize = '0.9em';
        footer.appendChild(dateElement);
    }
    
    // عدّاد الزوار البسيط
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    console.log(`👀 عدد الزيارات: ${visitCount}`);
    
    // إضافة زر جديد
    const addButton = document.createElement('button');
    addButton.textContent = '🎨 تغيير السمة';
    addButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 10px 20px;
        background: linear-gradient(to right, #3498db, #2c3e50);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    addButton.addEventListener('click', function() {
        const themes = [
            'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
            'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
            'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)'
        ];
        
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        document.body.style.background = randomTheme;
    });
    
    document.body.appendChild(addButton);
});

// وظائف مساعدة
function showAlert(message) {
    alert(`🔔 ${message}`);
}

function changeTitle(newTitle) {
    document.title = newTitle;
    return `تم تغيير العنوان إلى: ${newTitle}`;
}

// تصدير الدوال للاستخدام في الكونسول
window.siteFunctions = {
    showAlert,
    changeTitle,
    getVisitCount: () => localStorage.getItem('visitCount') || 0
};

// رسالة نهاية التحميل
window.addEventListener('load', function() {
    console.log('✅ تم تحميل الموقع بالكامل');
    console.log('💡 جرب في الكونسول: siteFunctions.showAlert("مرحباً!")');
});