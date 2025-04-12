/* ####################################### */
// Users data:
export const users = JSON.parse(localStorage.getItem('users')) || [];
/* ####################################### */

/* ####################################### */
// Save users:
export const saveUsers = () => {
    localStorage.setItem('users', JSON.stringify(users));
};
/* ####################################### */

/* ####################################### */
// Show message:
export const showMsg = (msg, type) => {
    Toastify({
        text: msg,
        duration: 3000,
        gravity: "bottom",
        position: "left",
        backgroundColor: type === "ERROR" ? "#f44336" : "#4caf50",
        stopOnFocus: true
    }).showToast();
}
/* ####################################### */