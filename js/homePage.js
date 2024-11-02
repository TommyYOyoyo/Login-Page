import { logOut } from "./utils.js";

// When logout button has been clicked, sign out of every auto-login account and redirect to login page
document.querySelector("#logout").addEventListener("mousedown", (e) => {
    logOut();
    window.location = "../pages/login.html";
});
