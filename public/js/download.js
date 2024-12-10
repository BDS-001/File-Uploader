async function downloadFile(fileId) {
    try {
        const response = await fetch(`/download/${fileId}`)

        if (!response.ok) {
            console.log('error downloading')
            const error = await response.json();
            throw new Error(error.error || 'Download Failed')
        }

        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'download';
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="(.+)"/);
            if (match) {
                filename = match[1];
            }
        }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
    
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
    } catch (error) {
        console.log(error)
        alert('Download failed. Please try again.');
    }
}