import React from "react";
 import {useContext, useState} from 'react'
 import reviewContext from "../Context/reviewContext";

// import {Link}  from 'react-router-dom';
// import { BrowserRouter, Route, Router, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Discover from "./Discover";
function ReviewAdded() {
   const context = useContext(reviewContext);
   const {addReview} = context;
 
  const [reviewed, setReviewed] = useState({title: "", author: "", review: ""})

   const handleClick = (e)=>{
    e.preventDefault();
    //<ReviewItems addReview = {addReview}/>
        addReview(reviewed.title, reviewed.author, reviewed.review);
       setReviewed({title: "", author: "", review: ""})
      //addReview(reviewed)
 }
 
   const onChange = (e)=>{
       setReviewed({...reviewed, [e.target.id]: e.target.value})
   }

    return ( 
       <div className="addreview">
    <form >
  <div className="form-group">
    <label htmlFor="title" className="font">Name of the book: </label>
    <input type="text" className="form-control" id="title" name="title"  onChange={onChange} placeholder="Book's Name"/>
  </div>
  <div className="form-group">
    <label htmlFor="author" className="font">Author's Name: </label>
    <input type="text" className="form-control" id="author" name="author" onChange={onChange}   placeholder="Author Name"/>
  </div>
  <div className="form-group">
  <label className="font" htmlFor="review">
      Add a review:
      <textarea name="postContent" id="review" className="form-control texting"  rows={20} cols={80} onChange={onChange}/>
    </label>
  </div>
  <div className="btns">
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Review</button>
  </div>
</form>
</div>
)
}

export default ReviewAdded;