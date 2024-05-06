import React, { useState, useEffect } from 'react';
import fetchBooks from '../fetchBooks';

const BookStrip = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchBooks();
            if (data) {
                setAllBooks(data);
                const initialBooks = data.slice(0, 9); // Initially display the first 8 books
                setDisplayedBooks(initialBooks);
                setCurrentIndex(0);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            let newBooks = [...displayedBooks];
            const randomIndex = Math.floor(Math.random() * newBooks.length);
            let randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
            while (newBooks.includes(randomBook)) {
                randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
            }
            newBooks[randomIndex] = randomBook;
            setDisplayedBooks(newBooks);
            setCurrentIndex(randomIndex);
        }, 2000); // Change every 2 seconds

        return () => clearInterval(interval);
    }, [allBooks, displayedBooks]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '130px 130px 130px', gridTemplateRows: '180px 180px 180px', gap: '10px', justifyContent: "right", marginTop: "115px", marginRight: "10px" }}>
            {displayedBooks.map((book, index) => (
                <div
                    key={book.key}
                    className="book"
                    style={{
                        opacity: index === currentIndex ? 0 : 1, // Fade out/in based on index
                        transition: 'opacity 1s ease-in-out', // CSS transition for fading effect
                    }}
                >
                    <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">
                        <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt={book.title} style={{ width: '130px', height: '180px' }} />
                    </a>
                </div>
            ))}
        </div>
    );
};

export default BookStrip;
