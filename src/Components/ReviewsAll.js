import React, { useContext, useEffect } from 'react'
import { ReviewContext } from "../Context/reviewContext";
import ReviewItems from './ReviewItems'

function ReviewsAll() {
  const Context = useContext(ReviewContext)
  const { reviews, getReview } = Context

  useEffect(() => {
    getReview()
  }, [])

  return (
    <div>
      <div className="reviews">
        <h1>Your Reviews</h1>
        {reviews.map((review) => {
          return <ReviewItems key={review._id} review={review} />
        })}
      </div>
    </div>
  )
}

export default ReviewsAll