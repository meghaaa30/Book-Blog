import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ReviewItems = ({ title, reviews }) => {
  const history = useHistory();
  const [matchingBook, setMatchingBook] = useState(null);

  const updateCachedBooks = () => {
    const cachedBooks = localStorage.getItem('cachedBooks');
    if (cachedBooks) {
      const books = JSON.parse(cachedBooks);
      const foundBook = books.find(book =>
        book.title.toLowerCase() === title.toLowerCase() &&
        book.authors.some(author => reviews.some(review => author.toLowerCase() === review.author.toLowerCase()))
      );
      setMatchingBook(foundBook);
    }
  };

  useEffect(() => {
    updateCachedBooks();

    const handleReviewAdded = () => {
      updateCachedBooks();
    };

    window.addEventListener('reviewAdded', handleReviewAdded);

    return () => {
      window.removeEventListener('reviewAdded', handleReviewAdded);
    };
  }, [title, reviews]);

  const handleClick = () => {
    history.push({
      pathname: "/reviews",
      state: { title }
    });
  };

  return (
    <div className='container'>
      <div className='cardreview'>
        <div className="card" style={{ width: '15em', height: '25em' }}>
          {matchingBook && matchingBook.coverUrl && (
            <img className="card-img-top" src={matchingBook.coverUrl} alt={title} />
          )}
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            {Array.from(new Set(reviews.map(review => review.author))).map((author, index) => (
              <p key={index} className="card-text">{author}</p>
            ))}
            <button onClick={handleClick} className="btn button" style={{ backgroundColor: '#6b4423', color: '#F5F5DC', padding: '4px' }}>
              Read Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItems;
