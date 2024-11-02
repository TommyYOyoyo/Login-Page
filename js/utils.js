// Export elements of this module
export { RememberMe, showPassword, getCookie, deleteCookie, logOut};

// In this project, I will be using cookies as a replacement of databases since using NodeJS would be too complexe to run on another computer.

/* RememberMe() is a basic simplified version of the remember-me functionality, 
 * Since in a real project, saving the user credentials directly into the local cookies = huge flaw for the security
 * I would rather use express-sessions if this project was built on NodeJS
 */

/* Set the login cookies according to whether the user had chosen the remember-me box or not
 * Yes: save the user's status as direct-login
 * No: save the user's credentials for login verification
 */
function RememberMe({ email, username=null, password, rememberMe }) {
    const date = new Date();
    // Expiring time
    const expires = "expires=" + date.toUTCString(date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)));

    // When used in login, retrieve the user's username as no username will be received as input
    if (username == null) username = getCookie(email).split('_')[0];

    // Verify if rememberMe box had been chosen
    if (rememberMe == false) {
        // If rememberMe box is not chosen, save login credentials
        document.cookie = `${email}=${username}_${password}; ${expires}; SameSite=None; Secure; path=/;`;
    } else {
        // If it's chosen, give the user a status of "direct login" and delete its normal status
        document.cookie = `direct=${email}_${username}_${password}; ${expires}; SameSite=None; Secure; path=/;`;
        deleteCookie(email);
    }
}

// Retrieve cookie data
function getCookie(name) {
    name = name + "=";
    // Get decoded cookies
    const cArray = decodeURIComponent(document.cookie).split(';');
    // Loop through cookie array
    for (let i = 0; i < cArray.length; i++) {
        let cookie = cArray[i];
        // Removes the first char if it's space, sets cookie to this new string
        while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1); 
        }
        // Element found, return its values
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length); // Return cookie values
        }
    }
    // Return nothing (cookie not found)
    return "";
}

// Function that logs out a existing user's session (those who're automatically logged in due to remember-me status)
function logOut() {
    const id = "direct";
    let email;
    let username;
    let password;
    const date = new Date();
    // Expiring time
    const expires = "expires=" + date.toUTCString(date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)));

    // Retrieve informations about the user
    const credentials = getCookie(id).split('_');
    email = credentials[0];
    username = credentials[1];
    password = credentials[2];

    // Delete direct-login cookie
    deleteCookie(id);

    // Sets new cookie to default cookies
    document.cookie = `${email}=${username}_${password}; ${expires}; SameSite=None; Secure; path=/;`;
}

// Function that deletes a cookie data
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// EASTER EGG FUNCTION: When eye had been clicked, reveal password
function showPassword(type) {
    // Show password upon mouse click, and unshow upon mouse release
    // Type 0 = password, other integers = confirmed password
    if (type == 0) {
        document.getElementById("password").type = "text";
        document.getElementById("seePassword").addEventListener("mouseup", () => {
            document.getElementById("password").type = "password";
        });
    } else {
        document.getElementById("confirmPassword").type = "text";
        document.getElementById("seeConfirmedPassword").addEventListener("mouseup", () => {
            document.getElementById("confirmPassword").type = "password";
        });
    }
}
