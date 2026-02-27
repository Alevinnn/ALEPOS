function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (username === "admin" && password === "1234") {
        window.location.href = "dashboard.html";
        return false;
    } else {
        errorMessage.textContent = "Username atau password salah!";
        return false;
    }
}