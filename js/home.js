/* ####################################### */
// Import global data:
import { saveUsers, showMsg, users } from "./global.js";
/* ####################################### */

const helloMessage = document.querySelector('.hello-message');
const logoutBtn = document.querySelector('.logout');

/* ####################################### */
// Display username:
const displayUsername = () => {
    const storedUserId = localStorage.getItem('userId');
    const user = users.find(user => user.id === +storedUserId);
    if (user) {
        helloMessage.textContent += user.username
    }
};
window.addEventListener('load', displayUsername);
/* ####################################### */

/* ####################################### */
// Handle Logout:
const handleLogout = () => {
    const storedUserId = localStorage.getItem('userId');
    users.map(userItem => {
        // Update User:
        if (userItem.id === +storedUserId) {
            userItem.isLoggedIn = false;
        }
    })
    // Save Users:
    saveUsers();
    // Show Success Message:
    showMsg('Logout Success', 'SUCCESS');
    // Redirect to login page:
    const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
    setTimeout(() => {
        location.assign(`${baseUrl}/index.html`);
    }, 1500);
};
logoutBtn.addEventListener('click', handleLogout)
/* ####################################### */

/* ####################################### */
// Handle on load:
const handleOnLoad = () => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
        const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
        location.assign(`${baseUrl}/index.html`);
    }
};
window.addEventListener('load', handleOnLoad);
/* ####################################### */