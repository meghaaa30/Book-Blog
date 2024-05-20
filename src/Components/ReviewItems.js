import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import twisted from "../assets/images/twisted.jpeg"

const ReviewItems = (props) => {
  const { review } = props
  return (
    <div className='cardreview'>
      <div className="card" style={{ width: 20 + 'em', height: 30 + 'em' }}>
        <img className="card-img-top" src={twisted} alt="Card image cap" />
        <div className="card-body">
          <h2 className="card-title">{review.title}</h2>
          <p className="card-text">{review.author}</p>
          <Link to='' className="btn button" style={{ backgroundColor: '#6b4423', color: '#F5F5DC', padding: 4 + 'px' }}>Read Review</Link>
        </div>
      </div>
    </div>
  )
}

export default ReviewItems
