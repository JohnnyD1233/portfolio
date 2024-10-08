const fetchItems = async (category) => {
    try {
        category = String(category)
        const response = await fetch(`http://localhost:5001/api/data/${category}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        console.log(error);
        return []; // Return an empty array or handle the error as needed
    }
};

export default fetchItems;
