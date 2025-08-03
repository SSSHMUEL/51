document.addEventListener('DOMContentLoaded', () => {
    // אלמנטים קיימים מהקוד שלך
    const mainContentArea = document.getElementById('mainContentArea');
    const mainTitle = document.getElementById('mainTitle');
    const mainSubtitle = document.getElementById('mainSubtitle');
    const dashboardStatsSection = document.getElementById('dashboardStatsSection');
    const actionCardsSection = document.getElementById('actionCardsSection');

    // אלמנטים חדשים לניהול משתמשים
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loggedInContent = document.getElementById('loggedInContent');
    const loggedOutContent = document.getElementById('loggedOutContent');
    const userNameElement = document.getElementById('userName');

    // פונקציה לעדכון הממשק
    const updateUI = (user) => {
        if (user) {
            // משתמש מחובר
            userNameElement.textContent = user.user_metadata.full_name || user.email.split('@')[0];
            mainTitle.innerHTML = `שלום, <span id="userName">${userNameElement.textContent}</span>!`;
            mainSubtitle.textContent = 'בוא נתחיל ללמוד משהו חדש היום.';
            loggedInContent.style.display = 'block';
            loggedOutContent.style.display = 'none';
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            // משתמש לא מחובר
            mainTitle.innerHTML = `שלום, <span id="userName">אורח</span>!`;
            mainSubtitle.textContent = 'התחבר כדי לשמור את ההתקדמות שלך.';
            loggedInContent.style.display = 'none';
            loggedOutContent.style.display = 'block';
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
        }
    };
    
    // בודק אם Netlify Identity זמין בדף
    if (window.netlifyIdentity) {
        // בודק מצב התחברות ראשוני
        const user = window.netlifyIdentity.currentUser();
        updateUI(user);

        // מאזין לאירועים של התחברות/התנתקות
        window.netlifyIdentity.on('login', user => {
            updateUI(user);
        });

        window.netlifyIdentity.on('logout', () => {
            updateUI(null);
        });

        // לחיצה על כפתור ההתחברות/ההרשמה הראשי
        loginBtn.addEventListener('click', () => {
            window.netlifyIdentity.open();
        });
        
        // לחיצה על כפתור ההתנתקות
        logoutBtn.addEventListener('click', () => {
            window.netlifyIdentity.logout();
        });

        // לחיצה על כפתורי ההתחברות/ההרשמה בתיבת ההודעה
        document.querySelector('.logged-out-actions').addEventListener('click', (event) => {
            if (event.target.dataset.action === 'login') {
                window.netlifyIdentity.open('login');
            } else if (event.target.dataset.action === 'signup') {
                window.netlifyIdentity.open('signup');
            }
        });
    }

    // קוד ניווט עמודים מהקוד הקיים שלך
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // מונע ניווט לדף אחר
            // כאן תוכל להוסיף לוגיקה שתטפל במעבר בין העמודים באמצעות JavaScript
            console.log(`נווט לעמוד: ${event.target.dataset.page}`);
        });
    });

    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            console.log(`התחיל פעולה: ${event.target.dataset.action}`);
        });
    });
});