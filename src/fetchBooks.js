import axios from 'axios';

const fetchBooks = async () => {
    const options = {
        method: 'GET',
        url: 'https://openlibrary.org/subjects/fiction.json',
        params: {
            limit: 8, // Number of results to fetch
        },
    };

    try {
        const response = await axios.request(options);
        return response.data.works;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default fetchBooks;
