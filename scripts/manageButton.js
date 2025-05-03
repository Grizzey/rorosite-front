//LOGIN FROM MANAGE
const manageBookingToLogin = document.getElementById("manage");

manageBookingToLogin.addEventListener("click", async function () {
    try {
        if (!window.user || !user.uid) {
            throw new Error("User not logged in");
        }

        await loadUserData(user.uid);
        console.log("TRYING TO LOGIN");
    } catch (error) {
        console.warn("Redirecting to login due to:", error.message);
        window.location.href = "/pages/login.html";
    }
});