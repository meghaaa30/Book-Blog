import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReviewContext } from '../Context/reviewContext';

const Reviews = () => {
    const host = "http://localhost:5000";
    const location = useLocation();
    const { title } = location.state;
    const Context = useContext(ReviewContext)
    const { reviews, setReviews } = Context

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${host}/api/addreviews/fetchbookreviews?title=${encodeURIComponent(title)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        //'auth-token':`Bearer ${token}`
                    }
                });
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [title, setReviews]);

    return (
        <div className='read-reviews'>
            <h1>Reviews for {title}</h1>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className="review-card">

                        <p>{review.review}</p>
                        {review.user ? (
                            <p>{`Reviewed by: ${review.user.firstName} ${review.user.lastName}`}</p>
                        ) : (
                            <p>Reviewer details not available</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No reviews found for this book.</p>
            )}
        </div>
    );
};

export default Reviews;
