import { RememberMe, showPassword, getCookie, logOut } from "./utils.js";

// Main function
function main() {

    // Trigger register() once the form is submitted, e = event
    document.querySelector("#form").addEventListener("submit", (e) => {
        register(e);
    });

    // Show password when the eye had been clicked, listening on button click
    document.querySelector("#seePassword").addEventListener("mousedown", () => {
        showPassword(0);
    });
    // Show confirmed password when the eye had been clicked, listening on button click
    document.querySelector("#seeConfirmedPassword").addEventListener("mousedown", () => {
        showPassword(1);
    });

}

// Verify if username is correct
function verifyUsername(username) {
    const warning = document.querySelector("#idWarning");
    // Check empty username and warn
    if (username.value == "") {
        warning.innerHTML = "*Ce champs est obligatoire";
        return 0;
    // Check if username contains space, warn if true
    } else if (username.value.search(/\s/g) > -1) {
        warning.innerHTML = "*Le nom d'utilisateur ne doit pas contenir d'espaces."
        return 0;
    }
    // Erase any previous warnings if all cases are met
    warning.innerHTML = "";
    return 1;
}

// Verify if email format is correct
function verifyEmail(email) {
    const warning = document.querySelector("#emailWarning");
    // Check if empty string was submitted
    if (email.value == "") {
        warning.innerHTML = "*Ce champs est obligatoire.";
        return 0;
    // Search for the presence of "text+@+text" and whitespaces. 
    // Email = invalid if it contains any whitespace or doesn't contain "text+@+text".
    } else if (email.value.search(/\w+@\w+/g) < 0 || email.value.search(/\s/g) > -1) {
        warning.innerHTML = "*Adresse Email Invalide";
        return 0;
    // If user already exists, tells the user to login if true
    } else if (getCookie(email.value) != "" || decodeURIComponent(document.cookie).indexOf(email.value) > -1) {
        warning.innerHTML = "*Vous êtes déjà inscrit. Veuillez vous connecter.";
        return 0;
    }
    // Erase any previous warning if all cases are met
    warning.innerHTML = "";
    return 1;
}

// Verify if password respects criterias
function verifyPassword(password) {
    const warning = document.querySelector("#passwordWarning");
    switch (true) {
        // Check if password length > 8 chars
        case password.value.length < 8:
            warning.innerHTML = "*Votre mot de passe doit contenir au moins 8 caractères.";
            return 0;
        // Check empty spaces, and warn if true
        case password.value.search(/\s/g) > -1:
            warning.innerHTML = "*Votre mot de passe ne doit pas contenir d'espaces.";
            return 0;
        // Check if password contains letters, and warn if not
        case password.value.search(/[A-Za-z]/g) < 0:
            warning.innerHTML = "*Votre mot de passe doit contenir des lettres.";
            return 0;
        // Check if password contains special characters, and warn if not
        case password.value.search(/([^A-Z0-9a-z\s*])/g) < 0:
            warning.innerHTML = "*Votre mot de passe doit contenir un caractère spécial.";
            return 0;
        // Check if password contains numbers, and warn if not
        case password.value.search(/([0-9])/g) < 0:
            warning.innerHTML = "*Votre mot de passe doit obligatoirement contenir un chiffre.";
            return 0;
    }
    // Erase any previous warning if all cases are met
    warning.innerHTML = "";
    return 1;
}

// Verify if two passwords are identical
function verifyIdenticalPassword(password, confirmedP) {
    const warning = document.querySelector("#confirmPasswordWarning");
    // Check if two passwords are identical, if not, warn
    if (password.value != confirmedP.value) {
        warning.innerHTML = "*Les mots de passe ne sont pas identiques.";
        return 0;
    }
    // Erase any previous warning if the case had been met
    warning.innerHTML = "";
    return 1;
}

// Register user
function register(e) {
    // Prevent form submitting automatically and page refreshing
    e.preventDefault();
    // Retreat the value of every entry
    const username = document.querySelector("#username");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const confirmedPassword = document.querySelector("#confirmPassword");
    const rememberMe = document.querySelector("#rememberMe");

    let verif1 = verifyUsername(username);
    let verif2 = verifyEmail(email);
    let verif3 = verifyPassword(password);
    let verif4 = verifyIdenticalPassword(password, confirmedPassword);
    // If any verification isn't passed, the function stops here
    if (verif1+verif2+verif3+verif4 != 4) return;

    // Log out all other user who have existing remember-me sessions
    logOut();

    // RememberMe() verifies if the box is checked and performs the according actions
    RememberMe({
        email : email.value,
        username : username.value,
        password : password.value,
        rememberMe : rememberMe.checked
    });

    // Sign in succeeded, proceeds to display a successful sign in text and redirect to another page.
    document.querySelector(".containerRegister").style.display = "none";
    // Change the successful sign-in alert text
    document.querySelector("#signInAlertText").innerHTML = `Bienvenue à vos ressources de programmation, ${username.value}!`
    document.querySelector(".successfulSignIn").style.display = "block"; // Make the alert text visible
    document.querySelector(".successfulSignIn").style.animation = "popUp linear 5s forwards"; // Animation
    document.querySelector(".register").style.animation = "blurOut linear 5s forwards"; // Animation
    setTimeout(() => {
        window.location = "../pages/homePage.html";
    }, 5000);
}

main();
