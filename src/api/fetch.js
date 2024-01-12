export async function fetchTodos() {
    try{
        const url = `https://jsonplaceholder.typicode.com/todos?_limit=4`;

        const response = await fetch(url);
        if(response.ok && response.status === 200){
            const data = await response.json();

            return data;
        }
        throw new Error(`Fetch error: ${response.status} - ${response.statusText}`)
    }catch(error){
        console.error(`Error get response`)
    }
};
