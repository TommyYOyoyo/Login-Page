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

// Register user
function login(e) {
    // Retreat the value of every entry
    const id = document.querySelector("#id");
    const password = document.querySelector("#password");
    const confirmedPassword = document.querySelector("#confirmPassword");

    verifyEmail(email, e);
    verifyPassword(password, e);
    verifyIdenticalPassword(password, confirmedPassword, e);
}

main();
