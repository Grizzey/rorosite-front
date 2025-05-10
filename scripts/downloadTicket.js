import "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";

export async function downloadTicketImage(ticketId) {
    // Ensure the ticketId is properly passed
    const ticketElement = document.getElementById(`ticket-${ticketId}`);
    if (!ticketElement) {
        console.error(`Ticket element with ID ${ticketId} not found.`);
        return;
    }

    try {
        console.log(ticketElement);
        // Adjust canvas capture settings for better rendering
        const canvas = await html2canvas(ticketElement, {
            useCORS: true,
            scrollX: 0,
            scrollY: -window.scrollY,
            width: ticketElement.offsetWidth,
            height: ticketElement.offsetHeight,
            logging: true,
            backgroundColor: null,
        }).then(canvas => {
            console.log("Generated ticket", canvas);
            const dataURL = canvas.toDataURL("image/png");
            if (window.Android && window.Android.saveImage) {
                window.Android.saveImage(dataURL);
            } else {
                console.error("Android interface not available.");
            }
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
