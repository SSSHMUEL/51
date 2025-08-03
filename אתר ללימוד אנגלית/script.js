document.addEventListener('DOMContentLoaded', () => {
    // אלמנטים שאנחנו מושכים מה-HTML
    const mainTitle = document.getElementById('mainTitle');
    const mainSubtitle = document.getElementById('mainSubtitle');
    const loggedInContent = document.getElementById('loggedInContent');
    const loggedOutContent = document.getElementById('loggedOutContent');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameElement = document.getElementById('userName');
    const navLinks = document.querySelectorAll('.main-nav a');
    const actionButtons = document.querySelectorAll('.action-button');
    const loggedOutActions = document.querySelector('.logged-out-actions');

    const authToggleButton = document.getElementById('netlify-identity-toggle');
    const authStatusText = document.getElementById('auth-status-text');

    // וודא ש-Netlify Identity קיים
    if (window.netlifyIdentity) {
        // פונקציה לעדכון הממשק בהתאם למצב המשתמש
        const updateUI = (user) => {
            if (user) {
                // משתמש מחובר
                const userName = user.user_metadata?.full_name || user.email.split('@')[0];
                if (userNameElement) {
                    userNameElement.textContent = userName;
                }
                if (mainTitle) {
                    mainTitle.innerHTML = `שלום, <span id="userName">${userName}</span>!`;
                }
                if (mainSubtitle) {
                    mainSubtitle.textContent = 'בוא נתחיל ללמוד משהו חדש היום.';
                }
                if (loggedInContent) {
                    loggedInContent.style.display = 'block';
                }
                if (loggedOutContent) {
                    loggedOutContent.style.display = 'none';
                }
                if (logoutBtn) {
                    logoutBtn.style.display = 'block';
                }
                if (authToggleButton) {
                    authToggleButton.style.display = 'none';
                }
            } else {
                // משתמש לא מחובר
                if (userNameElement) {
                    userNameElement.textContent = 'אורח';
                }
                if (mainTitle) {
                    mainTitle.innerHTML = `שלום, <span id="userName">אורח</span>!`;
                }
                if (mainSubtitle) {
                    mainSubtitle.textContent = 'התחבר כדי לשמור את ההתקדמות שלך.';
                }
                if (loggedInContent) {
                    loggedInContent.style.display = 'none';
                }
                if (loggedOutContent) {
                    loggedOutContent.style.display = 'block';
                }
                if (logoutBtn) {
                    logoutBtn.style.display = 'none';
                }
                if (authToggleButton) {
                    authToggleButton.style.display = 'block';
                }
            }
        };

        // מאזינים לאירועי התחברות/התנתקות
        netlifyIdentity.on('init', (user) => updateUI(user));
        netlifyIdentity.on('login', (user) => updateUI(user));
        netlifyIdentity.on('logout', () => updateUI(null));

        // אירועי לחיצה על כפתור ההתנתקות
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                netlifyIdentity.logout();
            });
        }
        
        // אירועי לחיצה על כפתור התחברות/הרשמה
        if (authToggleButton) {
            authToggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                netlifyIdentity.open();
            });
        }
        
        if (loggedOutActions) {
            loggedOutActions.addEventListener('click', (event) => {
                if (event.target.dataset.action === 'login' || event.target.dataset.action === 'signup') {
                    netlifyIdentity.open();
                }
            });
        }
    } else {
        console.error('Netlify Identity script was not loaded.');
    }
    
    // פונקציית ניווט עמודים
    function loadPage(pageName) {
        console.log(`נווט לעמוד: ${pageName}`);
    }

    // לוגיקת הניווט
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                loadPage(event.currentTarget.dataset.page);
                navLinks.forEach(navLink => navLink.parentElement.classList.remove('active'));
                event.currentTarget.parentElement.classList.add('active');
            });
        });
    }

    // לוגיקת כפתורי הפעולה
    if (actionButtons) {
        actionButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                console.log(`התחיל פעולה: ${event.currentTarget.dataset.action}`);
            });
        });
    }
});