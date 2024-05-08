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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginRight: '430px', marginLeft: '40px' }}>
                <div>
                    <h1 style={{ fontFamily: 'Poppins', fontSize: '4.5rem', fontWeight: '700', color: 'white', textAlign: 'left', marginBottom: '0', paddingBottom: '12px' }}>
                        Book-Blog
                    </h1>
                    <p style={{ fontFamily: 'Poppins', fontSize: '2.5rem', fontWeight: '500', color: 'white', textAlign: 'left', marginBottom: '0', marginTop: '0' }}>
                        Discover your next favorite book with
                    </p>
                    <p style={{ fontFamily: 'Poppins', fontSize: '2.5rem', fontWeight: '500', color: 'white', textAlign: 'left', marginTop: '0' }}>
                        our insightful reviews.
                    </p>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
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
        </div>
    );
};

export default BookStrip;
