/**
 * Sends the image to the server for processing.
 * @param {string} imageData - Base64-encoded image data.
 * @returns {Promise<string>} - The LaTeX code from the server.
 */
export async function sendImageToServer(imageData) {
    const useExternalServer = M.util.get_config('atto_handtotex', 'useexternalserver');
    let serverUrl = '';

    if (useExternalServer) {
        serverUrl = M.util.get_config('atto_handtotex', 'externalserverurl');
    } else {
        serverUrl = '/local/handtotex/infer';//Mudar para usar onix
    }

    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageData })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        return result.latex;
    } catch (error) {
        M.util.jslog('Error sending image to server:', error);
        return null;
    }
}
