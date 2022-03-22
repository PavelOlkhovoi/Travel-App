async function getKey(){
    try{
        const response = await fetch('http://localhost:8081/key');
        const data = await response.json();
        console.log('From code', data);
        return data;
    }catch(error) {
        return null;
    }
}

export { getKey }