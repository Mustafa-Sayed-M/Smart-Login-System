/* ####################################### */
// Import global data:
import { saveUsers, showMsg, users } from "./global.js";
/* ####################################### */

/* ####################################### */
// Get Elements:
const [
    formsContainer,
    formLogin,
    formSignup,
    formsSwitchers,
] = [
        document.querySelector('.forms-container'),
        document.getElementById('formLogin'),
        document.getElementById('formSignup'),
        document.querySelectorAll('form button.form-switcher')
    ];

// Login Inputs:
const [
    loginEmailInput,
    loginPasswordInput,
] = [
        document.getElementById('loginEmail'),
        document.getElementById('loginPassword'),
    ];
// Signup Inputs:
const [
    signupNameInput,
    signupEmailInput,
    signupPasswordInput,
] = [
        document.getElementById('signupName'),
        document.getElementById('signupEmail'),
        document.getElementById('signupPassword'),
    ];
/* ####################################### */

/* ####################################### */
// Add switch handler to every form switcher:
formsSwitchers.forEach((switcher) => {
    const mood = switcher.getAttribute('data-mood');
    switcher.addEventListener('click', () => {
        document.title = mood
        formsContainer.dataset.mood = mood;
    })
})
/* ####################################### */

/* ####################################### */
// User creation:
const userCreation = () => {
    // New User:
    const newUser = {
        id: Date.now(),
        isLoggedIn: false,
        username: signupNameInput.value,
        email: signupEmailInput.value,
        password: signupPasswordInput.value,
    }
    return newUser;
};
/* ####################################### */

/* ####################################### */
// ## Handle Signup:
const handleSignup = (e) => {
    e.preventDefault();
    const oldUser = users.find(user => user.email === signupEmailInput.value);
    if (oldUser) {
        showMsg('User already exist!', 'ERROR')
    } else {
        // Get User Data:
        const userData = userCreation();
        // Add to Users:
        users.push(userData);
        // Save Users:
        saveUsers();
        // Save User:
        saveUserId(userData.id);
        // Clear Inputs:
        clearInputs();
        // Redirect to signin:
        formsContainer.dataset.mood = 'Login';
        // Show Success Message:
        showMsg('User created successfully', 'SUCCESS')
        setTimeout(() => {
            // Show Success Message:
            showMsg('Please login', 'SUCCESS')
        }, 500);
    }
};
/* ####################################### */

/* ####################################### */
// Add signup handler to form signup:
formSignup.addEventListener('submit', handleSignup);
/* ####################################### */

/* ####################################### */
// Save users:
const saveUserId = (userId) => {
    localStorage.setItem('userId', userId);
};
/* ####################################### */

/* ####################################### */
// Clear inputs:
const clearInputs = () => {
    signupNameInput.value = '';
    signupEmailInput.value = '';
    signupPasswordInput.value = '';
};
/* ####################################### */

/* ####################################### */
// Handle Login:
const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === loginEmailInput.value);
    if (user) {
        if (user.password === loginPasswordInput.value) {
            // Update User:
            users.map(userItem => {
                if (userItem.id === user.id) {
                    userItem.isLoggedIn = true
                }
            })
            // Save Users:
            saveUsers();
            // Show Success Message:
            showMsg('Success Login', 'SUCCESS');
            // Redirect to Home Page:
            setTimeout(() => {
                const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
                location.assign(`${baseUrl}/home.html`);
            }, 1500);
        } else {
            showMsg('Password not correct!', "ERROR")
        }
    } else {
        showMsg('User not found!', "ERROR")
    }
};
/* ####################################### */

/* ####################################### */
// Add login handler to form login:
formLogin.addEventListener('submit', handleLogin);
/* ####################################### */

/* ####################################### */
// Handle onload:
const handleOnLoad = () => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) { // Check if user id found:
        const user = users.find(user => user.id === +storedUserId);
        if (user && user.isLoggedIn) {
            const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
            location.assign(`${baseUrl}/home.html`);
        } else {
            console.log(`User is not logged in, userID: ${user.id}`);
        }
    } else {
        localStorage.removeItem('users')
    }
};
/* ####################################### */

/* ####################################### */
// Add on load handler to window when load:
window.addEventListener('load', handleOnLoad)
/* ####################################### */