import React, { useContext, useEffect, useState } from 'react';
import { ReviewContext } from "../Context/reviewContext";
import ReviewItems from './ReviewItems';


function ReviewsAll() {
  const Context = useContext(ReviewContext);
  const { reviews, getReview } = Context;
 
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await getReview();
      } catch (err) {
        setError(err.message);
      } 
    };

    fetchReviews();
  }, [getReview]);

  const filteredReviews = reviews.filter((review) => {
    const query = searchQuery.toLowerCase();
    const words = review.title.toLowerCase().split(' ');
    return words.some((word) => word.startsWith(query));
  });

  return (
    <>
    <div className="reviews-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      </div>
      <div className="reviews">
        <h1>Your Reviews</h1>
        {filteredReviews.length === 0 ? (
          <div>No reviews available</div>
        ) : (
          filteredReviews.map((review) => (
            <ReviewItems key={review._id} review={review} />
          ))
        )}
      </div>
    </>
  );
}

export default ReviewsAll;
