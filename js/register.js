import { rememberMe, showPassword } from "./utils.js";

// Main function
function main() {

    // Trigger register() once the form is submitted
    document.querySelector("#form").addEventListener("submit", (e) => {
        register(e);
    });

    // Show password when the eye had been clicked
    document.querySelector("#seePassword").addEventListener("mousedown", () => {
        showPassword(0);
    });
    // Show confirmed password when the eye had been clicked
    document.querySelector("#seeConfirmedPassword").addEventListener("mousedown", () => {
        showPassword(1);
    });

}

// Verify if email format is correct
function verifyEmail(email, e) {
    const warning = document.querySelector("#emailWarning");
    // Check if empty string was submitted
    if (email.value == "") {
        e.preventDefault();
        warning.innerHTML = "*Ce champs est obligatoire.";
        return false;
    // Search for the presence of "text+@+text", if it doesn't exist, the email is invalid. Warns the user.
    } else if (email.value.search(/\w+@\w+/g) < 0 || email.value.search(/(\s+)/g) > 0) {
        e.preventDefault();
        warning.innerHTML = "*Adresse Email Invalide";
        return false;
    }
    // Erase any previous warning if all cases are met
    warning.innerHTML = "";
    return true;
}

// Verify if password respects criterias
function verifyPassword(password, e) {
    const warning = document.querySelector("#passwordWarning");
    switch (true) {
        // Check if password length > 8 chars
        case password.value.length < 8:
            e.preventDefault();
            warning.innerHTML = "*Votre mot de passe doit contenir au moins 8 caractères.";
            return false;
        // Check empty spaces, and warn if true
        case password.value.search(/\s+/g) > 0:
            e.preventDefault();
            warning.innerHTML = "*Votre mot de passe ne doit pas contenir d'espaces.";
            return false;
        // Check if password contains special characters, and warn if not
        case password.value.search(/([^A-Z0-9a-z\s*])/g) < 0:
            e.preventDefault();
            warning.innerHTML = "*Votre mot de passe doit contenir un caractère spécial.";
            return false;
        // Check if password contains numbers, and warn if not
        case password.value.search(/([0-9])/g) < 0:
            e.preventDefault();
            warning.innerHTML = "*Votre mot de passe doit obligatoirement contenir un chiffre.";
            return false;
    }
    // Erase any previous warning if all cases are met
    warning.innerHTML = "";
    return true;
}

// Verify if two passwords are identical
function verifyIdenticalPassword(password, confirmedP, e) {
    const warning = document.querySelector("#confirmPasswordWarning");
    // Check if two passwords are identical, if not, warn
    if (password.value != confirmedP.value) {
        e.preventDefault();
        warning.innerHTML = "*Les mots de passe ne sont pas identiques.";
        return false;
    }
    // Erase any previous warning if the case had been met
    warning.innerHTML = "";
    return true;
}

// Register user
function register(e) {
    // Retreat the value of every entry
    const username = document.querySelector("#username");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const confirmedPassword = document.querySelector("#confirmPassword");

    verifyEmail(email, e);
    verifyPassword(password, e);
    verifyIdenticalPassword(password, confirmedPassword, e);

    console.log("Success");
}

main();
