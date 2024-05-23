import React from 'react';
import { useHistory } from 'react-router-dom';
import twisted from "../assets/images/twisted.jpeg";

const ReviewItems = ({ review }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push({
            pathname: "/reviews",
            state: { title: review.title }
        });
    };

    return (
        <div className='container'>
            <div className='cardreview'>
                <div className="card" style={{ width: '15em', height: '25em' }}>
                    <img className="card-img-top" src={twisted} alt="Card image cap" />
                    <div className="card-body">
                        <div>
                            <h2 className="card-title">{review.title}</h2>
                            <p className="card-text">{review.author}</p>
                        </div>
                        <button onClick={handleClick} className="btn button" style={{ backgroundColor: '#6b4423', color: '#F5F5DC', padding: '4px' }}>
                            Read Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItems;
