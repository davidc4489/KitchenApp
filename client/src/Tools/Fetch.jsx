export default async function Fetch(path, setter, errorCallback = console.error) {
    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setter(data);
    } catch (error) {
        errorCallback(error);
    }
}