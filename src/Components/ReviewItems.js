import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ReviewItems = ({ title, reviews }) => {
  const history = useHistory();
  const [matchingBook, setMatchingBook] = useState(null);

  const updateCachedBooks = () => {
    const cachedBooks = localStorage.getItem('cachedBooks');
    if (cachedBooks) {
      const books = JSON.parse(cachedBooks);
      const removePunctuation = (str) => {
        return str.replace(/[^\w\d]/g, '').toLowerCase();
      };
      const foundBook = books.find(book => {
        const cachedTitle = removePunctuation(book.title);
        const matchedTitle = removePunctuation(title);
        const matchedAuthors = book.authors.some(author =>
          reviews.some(review =>
            removePunctuation(author).toLowerCase() === removePunctuation(review.author).toLowerCase()
          )
        );
        return cachedTitle === matchedTitle && matchedAuthors;
      });
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
      search: `?title=${encodeURIComponent(title.toLowerCase())}`,
      state: { title: title.toLowerCase() }
    });
  };

  return (
    <div className="container">
      <div className="cardreview">
        <div className="card flex-row">
          {matchingBook && matchingBook.coverUrl && (
            <img className="card-img-left example-card-img-responsive" src={matchingBook.coverUrl} alt={title} />
          )}
          <div className="card-body">
            <h4 className="card-title h5 h4-sm">{title}</h4>
            {Array.from(new Set(reviews.map(review => review.author))).map((author, index) => (
              <p key={index} className="card-text">{author}</p>
            ))}
            <button onClick={handleClick} className="btn read-reviews">
              Read Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItems;
