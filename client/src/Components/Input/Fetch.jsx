export default function Fetch (path, setter){
    fetch(path)
    .then(response => response.json())
    .then(data => setter(data))
}