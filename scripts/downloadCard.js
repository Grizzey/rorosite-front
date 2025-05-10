const userAgent = navigator.userAgent;


export function downloadCard() {
    if (userAgent.includes("wv")) {
        // The website is likely running inside a WebView
        console.log("Running in WebView");

        const downloadView = document.getElementById("app-download-card");

        downloadView.style.display = "none";
    } else {
        // The website is likely running in a browser
        console.log("Running in a browser");
    }
}

downloadCard();

window.downloadCard = downloadCard;