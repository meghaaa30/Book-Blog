import React from "react";


function Addreview() {
    return (
        
       <div className="addreview">
    <form >
  <div className="form-group">
    <label htmlFor="Book" className="font">Name of the book: </label>
    <input type="text" className="form-control" id="book_name" placeholder="Book's Name"/>
  </div>
  <div className="form-group">
    <label htmlFor="Author" className="font">Author's Name: </label>
    <input type="text" className="form-control" id="author" placeholder="Author Name"/>
  </div>
  <div className="form-group">
  <label htmlFor="review" className="font">Add a review: </label>
    <input type="textarea" className="form-control texting" id="review"/>
    
  </div>
  <div className="btn">
  <button type="submit" className="btn btn-primary">Add Review</button>
  </div>
</form>
</div>

)
}
export default Addreview;