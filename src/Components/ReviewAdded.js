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

function ReviewAdded() {
  const context = useContext(ReviewContext);
  const { addReview } = context;

  const [reviewed, setReviewed] = useState({ title: "", author: "", review: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [cardHeight, setCardHeight] = useState('600px'); 

  const handleClick = (e) => {
    e.preventDefault();
    addReview(reviewed.title, reviewed.author, reviewed.review);

    // Dispatch a custom event to notify about the new review
    const event = new Event('reviewAdded');
    window.dispatchEvent(event);

    setShowSuccess(true);
    setCardHeight('650px'); 

  
    setTimeout(() => {
      setShowSuccess(false);
      setCardHeight('600px'); 
    }, 3000);

    setReviewed({ title: "", author: "", review: "" });
  };

  const onChange = (e) => {
    setReviewed({ ...reviewed, [e.target.id]: e.target.value });
  };

  return (
    <MDBContainer fluid style={{ marginTop: '50px' }}>
      <MDBRow className='d-flex justify-content-center align-items-center h-150'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1000px', minHeight: cardHeight }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column' style={{ height: '100%' }}>
              <h2 className="fw-bold mb-2 text-center" style={{ color: '#361a03' }}>Add Review</h2>
              {showSuccess && (
                <div className='alert alert-success mb-4'>
                  Review added successfully!
                </div>
              )}
              <form onSubmit={handleClick}>
                <MDBInput wrapperClass='mb-4 w-100' label='Book Name' id='title' name='title' type='text' size="lg" onChange={onChange} value={reviewed.title} />
                <MDBInput wrapperClass='mb-4 w-100' label='Author Name' id='author' name='author' type='text' size="lg" onChange={onChange} value={reviewed.author} />
                <MDBTextArea wrapperClass='mb-4 w-100' label="Write a review" id="review" name='postContent' rows={7} type='text' size="lg" onChange={onChange} value={reviewed.review} />
                <MDBBtn size='lg' className="mb-2 w-100" style={{ backgroundColor: '#361a03', color: '#F5F5DC', boxShadow: 'none' }} type='submit'>
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
