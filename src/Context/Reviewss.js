 import reviewContext from "./reviewContext";
 import { useState } from "react";

const Review = (props) => {
  const host= "http://localhost:5000"
       const reviewsInitial = [
        
        // {
        //   "_id": "664347bded91371c6160a094",
        //   "user": "66433d130dd52e96853bb2aa",
        //   "title": "Twisted Love",
        //   "author": "annsa",
        //   "review": "love",
        //   "date": "2024-05-14T11:15:09.772Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "664363ce4cf48448b6279c25",
        //   "user": "66433d130dd52e96853bb2aa",
        //   "title": "Iews",
        //   "author": "meggy",
        //   "review": "sad",
        //   "date": "2024-05-14T13:14:54.243Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "664347bded91371c6160a094",
        //   "user": "66433d130dd52e96853bb2aa",
        //   "title": "Twisted Love",
        //   "author": "annsa",
        //   "review": "love",
        //   "date": "2024-05-14T11:15:09.772Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "664363ce4cf48448b6279c25",
        //   "user": "66433d130dd52e96853bb2aa",
        //   "title": "Iews",
        //   "author": "meggy",
        //   "review": "sad",
        //   "date": "2024-05-14T13:14:54.243Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "664347bded91371c6160a094",
        //   "user": "66433d130dd52e96853bb2aa",
        //   "title": "Twisted Love",
        //   "author": "annsa",
        //   "review": "love",
        //   "date": "2024-05-14T11:15:09.772Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "664363ce4cf48448b6279c25",
        //   "user": "66433d130dd52e96853bb2aa",
        //   "title": "Iews",
        //   "author": "meggy",
        //   "review": "sad",
        //   "date": "2024-05-14T13:14:54.243Z",
        //   "__v": 0
        // }
        
       ]    
     
        const [reviews, setReviews] = useState(reviewsInitial)

         //console.log('added')
        const addReview =async (title, author, review)=>{
          const response = await fetch(`${host}/api/addreviews/addreview`, {
                   method: 'POST',
                   headers: {
                     'Content-Type': 'application/json',
                     'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MzNkMTMwZGQ1MmU5Njg1M2JiMmFhIn0sImlhdCI6MTcxNTY4Mzc0Nn0.zjoy95R9hvCPgga0e9wrEhQniCtMOXKAtY0nQcvH7QA'
                   },
                   body: JSON.stringify({title, author, review})
                 });
           const reviewed = await response.json();
          setReviews(reviews.concat(reviewed));
            
       }

        return (
            <reviewContext.Provider value={{reviews, setReviews, addReview}}>
              {props.children}
            </reviewContext.Provider>
          )
    
}

// const Review = (props) => {
  
//     const host= "http://localhost:5000"
//     const reviewsInitial =[]
//     const [reviewed, setReviewed] = useState(reviewsInitial)
            

//     const getReview= async ()=>{
//         const response= await fetch(`${host}/api/addreviews/fetchreviews`,{
//         method:'GET',
//         headers: {
//            'Content-Type':'application/json',
//       }});
//       const json = await response.json() 
//       console.log(json)
//    setReviewed(json)
//       }

      
// const addReview = async (title, author, review) => {
//     const response = await fetch(`${host}/api/addreviews/post`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({title, author, review})
//     });
//     const reviews = await response.json();
//     setReviewed(reviewed.concat(reviews))
//         }

//         return (
//             <reviewContext.Provider value={{reviewed, addReview , getReview,setReviewed}}>
//               {props.children}
//             </reviewContext.Provider>
//           )
        

//     }

   export default Review;