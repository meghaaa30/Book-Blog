import React, { useContext, useEffect, useState } from 'react';
import { ReviewContext } from "../Context/reviewContext";
import ReviewItems from './ReviewItems';


function ReviewsAll() {
  const Context = useContext(ReviewContext);
  const { reviews, getReview } = Context;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
      getReview()
  }, []);

  const filteredReviews = reviews.filter((review) => {
    const query = searchQuery.trim().toLowerCase();
    const regex = new RegExp(`\\b${query}\\w*\\b`, 'i'); 
    return regex.test(review.title.toLowerCase());
});

  


  const groupedReviews = filteredReviews.reduce((acc, review) => {
    if (!acc[review.title]) {
      acc[review.title] = [];
    }
    acc[review.title].push(review);
    return acc;
  }, {});

  return (
    <>
      <div className="reviews-container">
        <div className="search-bar">
          <input
            type="search"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
  
        </div>
        <div className="reviews">
          <h1>Your Reviews</h1>
          {Object.keys(groupedReviews).length === 0 ? (
            <div>No reviews available for this Book.</div>
          ) : (
            Object.keys(groupedReviews).map((title) => (
              <ReviewItems key={title} title={title} reviews={groupedReviews[title]} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ReviewsAll;
