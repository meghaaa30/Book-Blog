import React from 'react';
import twisted from "../assets/images/twisted.jpeg";

const ReviewsPage = (props) => {
    const { review } = props.location.state;

    return (
        <div className='reviews'>

            <div className="card" style={{ width: '20em', height: '30em' }}>
                <img className="card-img-top" src={twisted} alt="Card image cap" />
                <div className="card-body">
                    <div>
                        <h2 className="card-title">Review Details</h2>
                        <p className="card-text">{review.review}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;
