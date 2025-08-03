document.addEventListener('DOMContentLoaded', () => {
    // אלמנטים שמשמשים לשמירת מצב המשתמש
    const userStats = {
        dailyGoal: 0,
        totalDailyGoal: 10,
        streakDays: 1,
        wordsLearnedCount: 0,
        totalPoints: 0,
        learnedWords: []
    };
    
    // כל המילים ללמידה - הועברו ישירות לקוד ה-JavaScript
    const allWords = [
        { id: 'w1', word: 'house', translation: 'בית', pronunciation: '/haʊs/', example: 'I live in a big house.' },
        { id: 'w2', word: 'car', translation: 'מכונית', pronunciation: '/kɑːr/', example: 'I drive a red car.' },
        { id: 'w3', word: 'tree', translation: 'עץ', pronunciation: '/triː/', example: 'There is a tall tree in the park.' },
    ];

    // אלמנטים שאנחנו מושכים מה-HTML
    const mainContentArea = document.getElementById('mainContentArea');
    const mainTitle = document.getElementById('mainTitle');
    const mainSubtitle = document.getElementById('mainSubtitle');

    const loggedInContent = document.getElementById('loggedInContent');
    const loggedOutContent = document.getElementById('loggedOutContent');

    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    const userNameElement = document.getElementById('userName');

    const navLinks = document.querySelectorAll('.main-nav a');
    const actionButtons = document.querySelectorAll('.action-button');
    const loggedOutActions = document.querySelector('.logged-out-actions');

    // פונקציה לעדכון הממשק
    const updateUI = (user) => {
        if (user) {
            // משתמש מחובר
            if (userNameElement) {
                userNameElement.textContent = user.user_metadata.full_name || user.email.split('@')[0];
            }
            if (mainTitle && userNameElement) {
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

    function loadPage(pageName) {
        console.log(`נווט לעמוד: ${pageName}`);
    }

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

    if (actionButtons) {
        actionButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                console.log(`התחיל פעולה: ${event.currentTarget.dataset.action}`);
            });
        });
    }
});