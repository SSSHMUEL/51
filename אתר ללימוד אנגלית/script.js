document.addEventListener('DOMContentLoaded', () => {
    // אלמנטים קיימים מהקוד שלך
    const mainContentArea = document.getElementById('mainContentArea');
    const mainTitle = document.getElementById('mainTitle');
    const mainSubtitle = document.getElementById('mainSubtitle');

    const loggedInContent = document.getElementById('loggedInContent');
    const loggedOutContent = document.getElementById('loggedOutContent');

    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    const userNameElement = document.getElementById('userName');

    // פונקציה לעדכון הממשק
    const updateUI = (user) => {
        if (user) {
            // משתמש מחובר
            if (userNameElement) {
                userNameElement.textContent = user.user_metadata.full_name || user.email.split('@')[0];
            }
            if (mainTitle) {
                mainTitle.innerHTML = `שלום, <span id="userName">${userNameElement.textContent}</span>!`;
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
            if (loginBtn) {
                loginBtn.style.display = 'none';
            }
            if (logoutBtn) {
                logoutBtn.style.display = 'block';
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
            if (loginBtn) {
                loginBtn.style.display = 'block';
            }
            if (logoutBtn) {
                logoutBtn.style.display = 'none';
            }
        }
    };
    
    // בודק אם Netlify Identity זמין בדף
    if (window.netlifyIdentity) {
        const user = window.netlifyIdentity.currentUser();
        updateUI(user);

        window.netlifyIdentity.on('login', user => {
            updateUI(user);
        });

        window.netlifyIdentity.on('logout', () => {
            updateUI(null);
        });

        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                window.netlifyIdentity.open();
            });
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                window.netlifyIdentity.logout();
            });
        }

        const loggedOutActions = document.querySelector('.logged-out-actions');
        if (loggedOutActions) {
            loggedOutActions.addEventListener('click', (event) => {
                if (event.target.dataset.action === 'login') {
                    window.netlifyIdentity.open('login');
                } else if (event.target.dataset.action === 'signup') {
                    window.netlifyIdentity.open('signup');
                }
            });
        }
    }

    // פונקציה לטיפול בניווט (נותרה ללא שינוי, היא תקינה)
    function loadPage(pageName) {
        console.log(`נווט לעמוד: ${pageName}`);
    }

    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            loadPage(event.currentTarget.dataset.page);
            
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