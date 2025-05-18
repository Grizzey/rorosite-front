import "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";

export async function downloadTicketImage(ticketId) {
    // Ensure the ticketId is properly passed
    const ticketElement = document.getElementById(`ticket-${ticketId}`);
    if (!ticketElement) {
        console.error(`Ticket element with ID ${ticketId} not found.`);
        return;
    }

    try {
        const canvas = await html2canvas(ticketElement, {
            useCORS: true,
            scrollX: 0,
            scrollY: -window.scrollY,
            width: ticketElement.offsetWidth,
            height: ticketElement.offsetHeight,
            logging: true,
            backgroundColor: null,
            ignoreElements: (element) => element.classList.contains("html2canvas-ignore")
        });

        if (!canvas || typeof canvas.toDataURL !== 'function') {
            console.error("Canvas generation failed or returned undefined.");
            return;
        }

        const image = canvas.toDataURL("image/png");

        // For Android native saving
        if (window.Android && window.Android.saveImage) {
            window.Android.saveImage(image);
        } else {
            // Fallback: download via browser
            const link = document.createElement("a");
            link.href = image;
            link.download = `ticket-${ticketId}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

    } catch (err) {
        console.error("Error capturing the ticket image:", err);
    }
}

window.downloadTicketImage = downloadTicketImage;
