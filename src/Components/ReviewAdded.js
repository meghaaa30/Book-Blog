import React from "react";
import { useContext, useState, useEffect } from 'react'
import { ReviewContext } from "../Context/reviewContext";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
}
  from 'mdb-react-ui-kit';

function ReviewAdded() {
  const context = useContext(ReviewContext);
  const { addReview } = context;

  const [reviewed, setReviewed] = useState({ title: "", author: "", review: "" });
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    //<ReviewItems addReview = {addReview}/>
    addReview(reviewed.title, reviewed.author, reviewed.review);
    setReviewed({ title: "", author: "", review: "" })
    //addReview(reviewed)
  }

  const onChange = (e) => {
    setReviewed({ ...reviewed, [e.target.id]: e.target.value })
  }

  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleBlur = () => {
    setIsFocused(false);
  }

  
  return (
    <MDBContainer fluid style={{ marginTop: '50px' }}>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1000px', minHeight: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column' style={{ height: '600px' }}>

              <h2 className="fw-bold mb-2 text-center" style={{ color: '#361a03' }}>Add Review</h2>

              <form onSubmit={handleClick}>
                <MDBInput onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{ border: isFocused ? '#361a03' : 'none' }}
                  wrapperClass='mb-4 w-100' label='Book Name' id='title' name='title' type='text' size="lg" onChange={onChange} />
                <MDBInput wrapperClass='mb-4 w-100' label='Author Name' id='author' name='author' type='text' size="lg" onChange={onChange} />
                <MDBTextArea wrapperClass='mb-4 w-100' label="Write a review" id="review" name='postContent' rows={7} type='text' size="lg" onChange={onChange} />

                <MDBBtn size='lg' className="mb-2 w-100" style={{ backgroundColor: '#361a03', color: '#F5F5DC', boxShadow: 'none' }} type='submit'  >
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