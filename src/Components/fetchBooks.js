import axios from 'axios';

// Utility function to wait for a given number of milliseconds
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to perform API request with exponential backoff
const fetchBookWithRetry = async (query, maxRetries = 5) => {
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const options = {
                method: 'GET',
                url: 'https://www.googleapis.com/books/v1/volumes',
                params: {
                    q: query,
                    maxResults: 1,
                    key: process.env.REACT_APP_GOOGLE_API_KEY,
                },
            };

            const response = await axios.request(options);
            if (response.data && response.data.items && response.data.items.length > 0) {
                const book = response.data.items[0].volumeInfo;
                return {
                    title: book.title,
                    authors: book.authors,
                    coverUrl: book.imageLinks?.thumbnail,
                    infoLink: book.infoLink,
                };
            }
            return null;

        } catch (error) {
            if (error.response && error.response.status === 429) {
                // Exponential backoff
                const waitTime = Math.pow(2, attempt) * 1000; // 1, 2, 4, 8, 16 seconds
                console.error(`429 Too Many Requests - Retrying in ${waitTime / 1000} seconds`);
                await wait(waitTime);
                attempt++;
            } else {
                console.error(error);
                return null;
            }
        }
    }

    throw new Error('Max retries exceeded');
};

// Fetch titles and author names from your MongoDB backend
const fetchTitlesAndAuthorsFromMongoDB = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/books/titles');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Fetch books from Google Books API using the titles and author names
const fetchBooksFromGoogleBooks = async (titlesAndAuthors) => {
    const promises = titlesAndAuthors.map(async ({ title, author }) => {
        const query = `${title} ${author}`;
        return fetchBookWithRetry(query);
    });

    const books = await Promise.all(promises);
    return books.filter(book => book !== null);
};

// Main fetchBooks function
const fetchBooks = async () => {
    const titlesAndAuthors = await fetchTitlesAndAuthorsFromMongoDB();
    if (titlesAndAuthors.length === 0) {
        return [];
    }

    const books = await fetchBooksFromGoogleBooks(titlesAndAuthors);
    return books;
};

export default fetchBooks;