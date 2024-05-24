import axios from 'axios';

// Fetch the last update version from MongoDB backend
const fetchBooksVersionFromMongoDB = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/books/version');
        return response.data.version;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Fetch titles and author names from MongoDB backend
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
        const options = {
            method: 'GET',
            url: 'https://www.googleapis.com/books/v1/volumes',
            params: {
                q: query,
                maxResults: 1,
                key: process.env.REACT_APP_GOOGLE_API_KEY,
            },
        };

        try {
            const response = await axios.request(options);
            if (response.data && response.data.items && response.data.items.length > 0) {
                const book = response.data.items[0].volumeInfo;
                return {
                    title: book.title,
                    authors: book.authors,
                    coverUrl: book.imageLinks?.thumbnail,
                };
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    });

    const books = await Promise.all(promises);
    return books.filter(book => book !== null);
};

// Check local storage for cached data
const getCachedBooks = () => {
    const cachedBooks = localStorage.getItem('cachedBooks');
    const cachedVersion = localStorage.getItem('cachedBooksVersion');
    if (cachedBooks && cachedVersion) {
        return {
            books: JSON.parse(cachedBooks),
            version: parseInt(cachedVersion, 10)
        };
    }
    return null;
};

// Save data to local storage
const cacheBooks = (books, version) => {
    localStorage.setItem('cachedBooks', JSON.stringify(books));
    localStorage.setItem('cachedBooksVersion', version.toString());
};

// Main fetchBooks function
const fetchBooks = async () => {
    const cachedData = getCachedBooks();
    const currentVersion = await fetchBooksVersionFromMongoDB();

    if (cachedData && cachedData.version === currentVersion) {
        return cachedData.books;
    }

    const titlesAndAuthors = await fetchTitlesAndAuthorsFromMongoDB();
    if (titlesAndAuthors.length === 0) {
        return [];
    }

    const books = await fetchBooksFromGoogleBooks(titlesAndAuthors);
    cacheBooks(books, currentVersion);
    return books;
};

export default fetchBooks;
