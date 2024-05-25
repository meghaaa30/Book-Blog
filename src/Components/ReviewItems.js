import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetchBooks from '../fetchBooks';

const ReviewItems = ({ review }) => {
    const history = useHistory();
    const [matchingBook, setMatchingBook] = useState(null);

    useEffect(() => {
        const updateCachedBooks = async () => {
            const books = await fetchBooks(); // Fetch books and update the cache if necessary
            const foundBook = books.find(book =>
                book.title.toLowerCase() === review.title.toLowerCase() &&
                book.authors.some(author => author.toLowerCase() === review.author.toLowerCase())
            );
            setMatchingBook(foundBook);
        };

        updateCachedBooks();
    }, [review.title, review.author]);

    const handleClick = () => {
        history.push({
            pathname: "/reviews",
            state: { title: review.title }
        });
    };

    return (
        <div className='container'>
            <div className='cardreview'>
                <div className="card" style={{ width: '15em', height: '25em' }}>
                    {matchingBook && matchingBook.coverUrl && (
                        <img className="card-img-top" src={matchingBook.coverUrl} alt={review.title} />
                    )}
                    <div className="card-body">
                        <div>
                            <h2 className="card-title">{review.title}</h2>
                            <p className="card-text">{review.author}</p>
                        </div>
                        <button onClick={handleClick} className="btn button" style={{ backgroundColor: '#6b4423', color: '#F5F5DC', padding: '4px' }}>
                            Read Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItems;
