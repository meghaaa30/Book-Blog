import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import { ReviewContext } from '../Context/reviewContext';

const Reviews = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const location = useLocation();
    const { title } = location.state;
    const Context = useContext(ReviewContext);
    const { reviews, setReviews } = Context;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${baseUrl}/addreviews/fetchbookreviews?title=${encodeURIComponent(title)}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [title, setReviews, baseUrl]);

    return (
        <Container className='read-reviewed mt-5' >
            <h1 className='text-center mb-4'>Reviews for {title.toUpperCase()}</h1>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Card key={review._id} className='review-card'>
                        <Card.Body>
                            <Card.Text>{review.review}</Card.Text>
                            {review.user ? (
                                <Card.Footer className="text-muted">
                                    Review by: {`${review.user.firstName} ${review.user.lastName}`}
                                </Card.Footer>
                            ) : (
                                <Card.Footer className="text-muted">Reviewer details not available</Card.Footer>
                            )}
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p className='text-center'>No reviews found for this book.</p>
            )}
        </Container>
    );
};

export default Reviews;
