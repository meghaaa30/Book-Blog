import React, { useContext} from 'react'
import reviewContext from '../Context/reviewContext'
import ReviewItems from './ReviewItems'

function ReviewsAll() {
   const Context= useContext(reviewContext)
   const {reviews}=Context
  return (
    <div>
      
      < div className="reviews">
                 <h1>Your Reviews</h1>
                {reviews.map((review)=>{
                       return <ReviewItems key={review._id} review = {review}/>
                })}
                
            
            </div>
            
    </div>
  )
}

export default ReviewsAll