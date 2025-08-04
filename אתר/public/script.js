const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const userEmailSpan = document.getElementById('user-email');
const numbersList = document.getElementById('numbers-list');
const messagesDiv = document.getElementById('messages');

function showMessage(msg) {
    messagesDiv.textContent = msg;
    messagesDiv.classList.add('show');
    setTimeout(() => {
        messagesDiv.classList.remove('show');
    }, 3000);
}

function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

function getAuthToken() {
    return localStorage.getItem('authToken');
}

function removeAuthToken() {
    localStorage.removeItem('authToken');
}

async function callNetlifyFunction(name, method, body = null, auth = true) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (auth) {
        const token = getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        } else {
            showMessage('Session expired, please log in again.');
            updateUI(false);
            return null;
        }
    }

    try {
        const options = {
            method: method,
            headers: headers,
        };
        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`/.netlify/functions/${name}`, options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'שגיאה כללית בפונקציה.');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error calling function ${name}:`, error);
        showMessage(`שגיאה: ${error.message}`);
        return null;
    }
}

async function updateUI(isLoggedIn, email = null) {
    if (isLoggedIn) {
        authSection.style.display = 'none';
        appSection.style.display = 'block';
        userEmailSpan.textContent = email;
        await fetchAndDisplayNumbers();
    } else {
        authSection.style.display = 'block';
        appSection.style.display = 'none';
        userEmailSpan.textContent = '';
        numbersList.innerHTML = '';
    }
}

async function fetchAndDisplayNumbers() {
    numbersList.innerHTML = '<li>טוען מספרים...</li>';
    const result = await callNetlifyFunction('getNumbers', 'GET');
    
    numbersList.innerHTML = '';
    if (result && result.numbers) {
        if (result.numbers.length === 0) {
            numbersList.innerHTML = '<li>עדיין לא שמרת מספרים.</li>';
        } else {
            result.numbers.forEach(num => {
                const li = document.createElement('li');
                li.textContent = num;
                numbersList.appendChild(li);
            });
        }
    } else {
        numbersList.innerHTML = '<li>שגיאה בטעינת המספרים.</li>';
    }
}

// Event Listeners
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const result = await callNetlifyFunction('register', 'POST', { email, password }, false);
    if (result && result.token) {
        setAuthToken(result.token);
        showMessage('נרשמת בהצלחה!');
        updateUI(true, result.email);
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-password').value;
    const result = await callNetlifyFunction('login', 'POST', { email, password }, false);
    if (result && result.token && result.email) {
        setAuthToken(result.token);
        showMessage('התחברת בהצלחה!');
        updateUI(true, result.email);
    }
});

document.getElementById('save-number-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const number = parseInt(document.getElementById('new-number').value);
    if (isNaN(number)) {
        showMessage('אנא הכנס מספר חוקי.');
        return;
    }
    const result = await callNetlifyFunction('saveNumber', 'POST', { number });
    if (result && result.success) {
        showMessage('המספר נשמר בהצלחה!');
        document.getElementById('new-number').value = '';
        fetchAndDisplayNumbers();
    }
});

document.getElementById('logout-button').addEventListener('click', () => {
    removeAuthToken();
    showMessage('התנתקת בהצלחה.');
    updateUI(false);
});

// Initial check on page load
(async () => {
    const token = getAuthToken();
    if (token) {
        const result = await callNetlifyFunction('login', 'POST', null, false);
        if (result && result.email) {
            updateUI(true, result.email);
        } else {
            removeAuthToken();
            updateUI(false);
        }
    } else {
        updateUI(false);
    }
})();