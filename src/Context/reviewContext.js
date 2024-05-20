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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0YTYyYzNlODgxZTM3M2VhYWI4ZTkzIn0sImlhdCI6MTcxNjE1NDkyM30.dLBZ6awAVVZK6XGJvIqfPvXE67HGeJssoGucNv5RUUo'
            }
        });
        const reviewed = await response.json();
        console.log(reviewed);
        setReviews(reviewed);
    };

    const addReview = async (title, author, review) => {
        const response = await fetch(`${host}/api/addreviews/addreview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0YTYyYzNlODgxZTM3M2VhYWI4ZTkzIn0sImlhdCI6MTcxNjE1NDkyM30.dLBZ6awAVVZK6XGJvIqfPvXE67HGeJssoGucNv5RUUo'
            },
            body: JSON.stringify({ title, author, review })
        });
        const reviewed = await response.json();
        setReviews(reviews.concat(reviewed));
    };

    return (
        <ReviewContext.Provider value={{ reviews, addReview, getReview }}>
            {props.children}
        </ReviewContext.Provider>
    );
};
