document.getElementById('scrnBTN').addEventListener('click', async () => {
    try {
        const response = await fetch('https://deploy-2-vy5x.onrender.com/screenshot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'image/png'
            },
            mode: 'cors',
            credentials: 'omit' // Changed from 'include' to 'omit'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'screenshot.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Screenshot failed:', error);
        alert(`Screenshot failed: ${error.message}`);
    }
});
