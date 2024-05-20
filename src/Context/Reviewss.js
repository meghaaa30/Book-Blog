// import reviewContext from "./reviewContext";
// import { useState } from "react";

// const Review = (props) => {
//   const host = "http://localhost:5000"
//   const reviewsInitial = [];

//   const [reviews, setReviews] = useState(reviewsInitial)

//   const getReview = async () => {
//     const response = await fetch(`${host}/api/addreviews/fetchreviews`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MzNkMTMwZGQ1MmU5Njg1M2JiMmFhIn0sImlhdCI6MTcxNTY4Mzc0Nn0.zjoy95R9hvCPgga0e9wrEhQniCtMOXKAtY0nQcvH7QA'
//       }
//     });
//     const reviewed = await response.json()
//     console.log(reviewed)
//     setReviews(reviewed);
//   }
//   const addReview = async (title, author, review) => {
//     const response = await fetch(`${host}/api/addreviews/addreview`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0YTYyYzNlODgxZTM3M2VhYWI4ZTkzIn0sImlhdCI6MTcxNjE1MTE2Nn0.MTLkHaMxGk3uRoDt1KoqCZLbWno6SeXYIgI3aa8ogbM'
//       },
//       body: JSON.stringify({ title, author, review })
//     });
//     const reviewed = await response.json();
//     setReviews(reviews.concat(reviewed));

//   }

//   return (
//     <reviewContext.Provider value={{ reviews, setReviews, addReview, getReview }}>
//       {props.children}
//     </reviewContext.Provider>
//   )

// }



// export default Review;