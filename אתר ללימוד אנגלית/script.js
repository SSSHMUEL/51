document.addEventListener('DOMContentLoaded', () => {
    // שלב 1: הגדרת מפתחות Supabase
    const SUPABASE_URL = 'https://jragfudubmyzbbqyqzbi.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyYWdmdWR1Ym15emJieXF3enbiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1NDI1NjkyOSwiZXhwIjoyMDY5ODMyOTI5fQ.CmwVzAthV0aiPfhzf93yOQhebYbkvuZdBD8lG2xx5ps';
    
    // אתחול לקוח Supabase
    const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // אלמנטים שאנחנו מושכים מה-HTML
    const mainTitle = document.getElementById('mainTitle');
    const mainSubtitle = document.getElementById('mainSubtitle');
    const loggedInContent = document.getElementById('loggedInContent');
    const loggedOutContent = document.getElementById('loggedOutContent');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameElement = document.getElementById('userName');
    const navLinks = document.querySelectorAll('.main-nav a');
    const actionButtons = document.querySelectorAll('.action-button');
    const loggedOutActions = document.querySelector('.logged-out-actions');

    // פונקציה לעדכון הממשק בהתאם למצב המשתמש
    const updateUI = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            // משתמש מחובר
            if (userNameElement) {
                const userName = user.user_metadata?.full_name || user.email.split('@')[0];
                userNameElement.textContent = userName;
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
            if (signupBtn) {
                signupBtn.style.display = 'none';
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
            if (signupBtn) {
                signupBtn.style.display = 'block';
            }
            if (logoutBtn) {
                logoutBtn.style.display = 'none';
            }
        }
    };

    // פונקציה לטיפול בהתחברות
    const handleLogin = async () => {
        const email = prompt("הכנס אימייל:");
        const password = prompt("הכנס סיסמה:");
        if (!email || !password) return;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Login failed:', error.message);
            alert(`התחברות נכשלה: ${error.message}`);
        } else {
            updateUI();
        }
    };

    // פונקציה לטיפול בהרשמה
    const handleSignup = async () => {
        const email = prompt("הכנס אימייל להרשמה:");
        const password = prompt("הכנס סיסמה (6 תווים לפחות):");
        if (!email || !password) return;
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            console.error('Signup failed:', error.message);
            alert(`הרשמה נכשלה: ${error.message}`);
        } else {
            alert('הרשמה בוצעה בהצלחה! יש לאשר את האימייל.');
        }
    };
    
    // פונקציה לטיפול בהתנתקות
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Logout failed:', error.message);
        } else {
            updateUI();
        }
    };

    // אירועי לחיצה על הכפתורים
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    if (signupBtn) {
        signupBtn.addEventListener('click', handleSignup);
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    if (loggedOutActions) {
        loggedOutActions.addEventListener('click', (event) => {
            if (event.target.dataset.action === 'login') {
                handleLogin();
            } else if (event.target.dataset.action === 'signup') {
                handleSignup();
            }
        });
    }

    // מאזין לאירועים של שינוי מצב אימות המשתמש
    supabase.auth.onAuthStateChange((event, session) => {
      updateUI();
    });
    
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
    
    // עדכון ראשוני של הממשק
    updateUI();
});