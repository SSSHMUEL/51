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

    // פונקציית loadPage שחסרה לך
    function loadPage(pageName) {
        // בנתיים, היא רק תדפיס הודעה לקונסול
        console.log(`נווט לעמוד: ${pageName}`);
        
        // כאן תוכל להוסיף לוגיקה שתטען תוכן שונה לכל עמוד.
        // לדוגמה, אתה יכול להסתיר ולהציג אלמנטים מסוימים.
        // מכיוון שבאתר שלך יש רק את עמוד הבית כרגע, היא יכולה להיות פשוטה.
    }

    // קוד ניווט עמודים מהקוד הקיים שלך
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // מונע ניווט לדף אחר
            // הפונקציה loadPage קוראת עכשיו
            loadPage(event.currentTarget.dataset.page);
            
            // עדכון ה-Active Link
            navLinks.forEach(navLink => navLink.parentElement.classList.remove('active'));
            event.currentTarget.parentElement.classList.add('active');
        });
    });

    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            console.log(`התחיל פעולה: ${event.currentTarget.dataset.action}`);
        });
    });
});