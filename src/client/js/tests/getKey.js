/**
* @description The get request to the internal server to get the API key 
* @returns {object} Key - Custom object that will send on server
*/
async function getKey(){
    try{
        const response = await fetch('http://localhost:8081/key');
        const data = await response.json();
        return data;
    }catch(error) {
        return null;
    }
}

export { getKey }