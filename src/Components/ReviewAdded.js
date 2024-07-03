import React, { useContext, useState } from 'react';
import { ReviewContext } from "../Context/reviewContext";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea
} from 'mdb-react-ui-kit';
import '../styles/AddReview.css';

function ReviewAdded() {
  const context = useContext(ReviewContext);
  const { addReview } = context;

  const [reviewed, setReviewed] = useState({ title: "", author: "", review: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [cardHeight, setCardHeight] = useState('review-form-container');

  const handleClick = (e) => {
    e.preventDefault();
    addReview(reviewed.title, reviewed.author, reviewed.review);

    // Dispatch a custom event to notify about the new review
    const event = new Event('reviewAdded');
    window.dispatchEvent(event);

    setShowSuccess(true);
    setCardHeight('review-form-container expand');

    setTimeout(() => {
      setShowSuccess(false);
      setCardHeight('review-form-container');
    }, 3000);

    setReviewed({ title: "", author: "", review: "" });
  };

  const onChange = (e) => {
    setReviewed({ ...reviewed, [e.target.id]: e.target.value });
  };

  return (
    <MDBContainer fluid className="review-form-container">
      <MDBRow className='review-form-wrapper'>
        <MDBCol col='12'>
          <MDBCard className={`bg-white my-5 mx-auto ${cardHeight}`}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center review-form-header">Add Review</h2>
              {showSuccess && (
                <div className='alert alert-success review-form-success'>
                  Review added successfully!
                </div>
              )}
              <form onSubmit={handleClick}>
                <MDBInput wrapperClass='mb-4 w-100' label='Book Name' id='title' name='title' type='text' size="lg" onChange={onChange} value={reviewed.title} required />
                <MDBInput wrapperClass='mb-4 w-100' label='Author Name' id='author' name='author' type='text' size="lg" onChange={onChange} value={reviewed.author} required />
                <MDBTextArea wrapperClass='mb-4 w-100' label="Write a review" id="review" name='postContent' rows={7} type='textarea' size="lg" onChange={onChange} value={reviewed.review} required />
                <MDBBtn size='lg' className="mb-2 w-100 review-form-button" type='submit'>
                  Add Review
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ReviewAdded;
