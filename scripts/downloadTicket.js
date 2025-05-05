import "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";

export async function downloadTicketImage(ticketId) {
    // Ensure the ticketId is properly passed
    const ticketElement = document.getElementById(`ticket-${ticketId}`);
    if (!ticketElement) {
        console.error(`Ticket element with ID ${ticketId} not found.`);
        return;
    }

    try {
        // Adjust canvas capture settings for better rendering
        const canvas = await html2canvas(ticketElement, {
            useCORS: true, // This allows cross-origin images (important for QR code)
            scrollX: 0, // Ensure the screen isn't scrolling when capturing
            scrollY: -window.scrollY, // Adjust if the page has any scroll
            width: ticketElement.offsetWidth, // Capture the correct width of the element
            height: ticketElement.offsetHeight, // Capture the correct height of the element
            logging: true, // Logs for debugging purposes
            backgroundColor: null, // Transparent background
            // x: ticketElement.getBoundingClientRect().left, // Adjust x-position
            // y: ticketElement.getBoundingClientRect().top,  // Adjust y-position
        });

        // Convert canvas to image data URL
        const image = canvas.toDataURL("image/png");

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = image;
        link.download = `ticket-${ticketId}.png`; // Name the file with ticketId
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error capturing the ticket image:", error);
    }
}

window.downloadTicketImage = downloadTicketImage;
