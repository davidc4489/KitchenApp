export default async function Fetch(path, setter, token = '') {
    try {
        console.log("token", token)
        // Construire les en-têtes avec le token si fourni
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }) // Ajoute le token si disponible
        };

        const response = await fetch(path, { headers });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setter(data);
    } catch (error) {
        console.error('errorCallback is not a function:', error);
        
    }
}