document.addEventListener('DOMContentLoaded', () => {
    const mainContentArea = document.getElementById('mainContentArea');
    const mainTitle = document.getElementById('mainTitle');
    const mainSubtitle = document.getElementById('mainSubtitle');
    const dashboardStatsSection = document.getElementById('dashboardStatsSection');
    const actionCardsSection = document.getElementById('actionCardsSection');
    
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loggedInContent = document.getElementById('loggedInContent');
    const loggedOutContent = document.getElementById('loggedOutContent');
    const userNameElement = document.getElementById('userName');

    const updateUI = (user) => {
        if (user) {
            userNameElement.textContent = user.user_metadata.full_name || user.email.split('@')[0];
            mainTitle.innerHTML = `שלום, <span id="userName">${userNameElement.textContent}</span>!`;
            mainSubtitle.textContent = 'בוא נתחיל ללמוד משהו חדש היום.';
            loggedInContent.style.display = 'block';
            loggedOutContent.style.display = 'none';
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            mainTitle.innerHTML = `שלום, <span id="userName">אורח</span>!`;
            mainSubtitle.textContent = 'התחבר כדי לשמור את ההתקדמות שלך.';
            loggedInContent.style.display = 'none';
            loggedOutContent.style.display = 'block';
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
        }
    };
    
    if (window.netlifyIdentity) {
        const user = window.netlifyIdentity.currentUser();
        updateUI(user);

        window.netlifyIdentity.on('login', user => {
            updateUI(user);
        });

        window.netlifyIdentity.on('logout', () => {
            updateUI(null);
        });

        loginBtn.addEventListener('click', () => {
            window.netlifyIdentity.open();
        });
        
        logoutBtn.addEventListener('click', () => {
            window.netlifyIdentity.logout();
        });

        document.querySelector('.logged-out-actions').addEventListener('click', (event) => {
            if (event.target.dataset.action === 'login') {
                window.netlifyIdentity.open('login');
            } else if (event.target.dataset.action === 'signup') {
                window.netlifyIdentity.open('signup');
            }
        });
    }

    function loadPage(pageName) {
        console.log(`נווט לעמוד: ${pageName}`);
        
        // כאן תוכל להוסיף לוגיקה שתטען תוכן שונה לכל עמוד
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