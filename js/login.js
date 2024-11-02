import { RememberMe, showPassword, getCookie, logOut } from "./utils.js";

// Main function
function main() {

    // If the user had previously selected remember-me, directly login the user
    if (getCookie("direct") != "") {
        let username = getCookie("direct").split('_')[1];
        displayLogin(username);
    } 

    // Trigger login() once the form is submitted, e = event
    document.querySelector("#form").addEventListener("submit", (e) => {
        login(e);
    });

    // Show password when the eye had been clicked
    document.querySelector("#seePassword").addEventListener("mousedown", () => {
        showPassword(0);
    });
}

// Function that verifies if the credentials are correct according to the cookies stored.
function verifyLoginCredentials(id, password) {
    const idWarning = document.querySelector("#idWarning");
    const passwordWarning = document.querySelector("#passwordWarning");
    const cookie = getCookie(id);

    if (cookie != "") {
        // Erase any previous email warnings
        idWarning.innerHTML = "";
        const storedPassword = cookie.split('_')[1];
        // If giving password isn't matching with stored password
        if (password != storedPassword) {
            passwordWarning.innerHTML = "*Mot de passe incorrecte";
            return false;
        }
        // SUCCESS: Remove any previous warning when all cases are passed
        passwordWarning.innerHTML = "";
        return true;
    } else {
        // Email cannot be found
        idWarning.innerHTML = "*Addresse courriel invalide";
        return false;
    }
}

// A function that displays the login successful text and redirects the user to the homepage
function displayLogin(id) {
    document.querySelector(".containerLogin").style.display = "none";
    document.querySelector("#loginAlertText").innerHTML = `Rebonjour, ${id}!`;
    // Change the successful login alert text
    document.querySelector(".successfulLogin").style.display = "block"; // Make the alert text visible
    document.querySelector(".successfulLogin").style.animation = "popUp linear 5s forwards"; // Animation
    document.querySelector(".login").style.animation = "blurOut linear 5s forwards"; // Animation

    // Redirect to homepage
    setTimeout(() => {
        window.location = "../pages/homePage.html";
    }, 5000);
}

// Login handler
function login(e) {
    // Prevent form submitting automatically and page refreshing
    e.preventDefault();
    // Retrieve the value of every entry
    const id = document.querySelector("#id");
    const password = document.querySelector("#password");
    const rememberMe = document.querySelector("#rememberMe");

    const name = getCookie(id.value).split('_')[0];

    // If the user's credentials are correct
    if (verifyLoginCredentials(id.value, password.value)) {

        // Log out every user who have existing remember-me sessions
        logOut();

        // RememberMe() verifies if the box is checked and performs the according actions
        RememberMe({
            email : id.value,
            password : password.value,
            rememberMe : rememberMe.checked
        });

        // Login successful, proceeds to display a successful login text and redirect to another page.
        displayLogin(name);
    }
}

main();
