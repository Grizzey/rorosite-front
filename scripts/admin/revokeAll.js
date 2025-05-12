export async function revokeAllSessions() {
    const status = document.getElementById('adminStatus');
    status.textContent = 'Processing...';

    try {
        const res = await fetch('/admin/revoke-all', {
            method: 'POST'
        });
        const data = await res.json();
        if (res.ok) {
            status.textContent = '✅ All users have been signed out.';
        } else {
            status.textContent = '⚠️ Failed: ' + data.error;
        }
    } catch (err) {
        status.textContent = '⚠️ Error: ' + err.message;
    }
}