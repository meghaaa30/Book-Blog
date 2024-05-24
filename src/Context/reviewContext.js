import React, { createContext, useState } from 'react';

export const ReviewContext = createContext();

export const ReviewProvider = (props) => {
    const host = "http://localhost:5000";
    const reviewsInitial = [];

    const [reviews, setReviews] = useState(reviewsInitial);

    const getReview = async () => {
        const response = await fetch(`${host}/api/addreviews/fetchreviews`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const reviewed = await response.json();
        setReviews(reviewed);
    };

    // Function to get token from localStorage
    const getToken = () => {
        return localStorage.getItem('token');
    };

    // Function to add a review
    const addReview = async (title, author, review) => {
        const token = getToken();
        if (!token) {
            console.error('No token found');
            // Handle the case where the token is not found (e.g., redirect to login page)
            return;
        }

        try {
            const response = await fetch(`${host}/api/addreviews/addreview`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `Bearer ${token}`
                },
                body: JSON.stringify({ title, author, review })
            });

            if (!response.ok) {
                throw new Error('Failed to add review');
            }

            const reviewed = await response.json();
            setReviews(reviews.concat(reviewed));
        } catch (error) {
            console.error('Error adding review:', error);

        }
    };

    return (
        <ReviewContext.Provider value={{ reviews, addReview, getReview, setReviews }}>
            {props.children}
        </ReviewContext.Provider>
    );
};

