import React, { useState, useEffect } from 'react';
import fetchBooks from '../fetchBooks';

const BookStrip = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchBooks();
            if (data) {
                setBooks(data);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                {books.map(book => (
                    <div key={book.key} className="book">
                        <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">
                            <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt={book.title} style={{ width: '180px', height: '250px' }} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookStrip;
