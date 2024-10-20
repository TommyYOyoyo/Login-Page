// Export elements
export { rememberMe, showPassword, setCookie, getCookie };

function setCookie(id) {
    document.cookie = ``;
}

function getCookie(id) {

}

function showPassword(type) {
    // Show password upon mouse click, and unshow upon mouse release
    // Type 0 = password, other types = confirmed password
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

function rememberMe(isTicked, id, password) {
    isTicked ? setCookie(id, password) : deleteCookie(id);
}
