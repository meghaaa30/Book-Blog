import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center text-lg-start text-white footer">
      <div className="container p-4 pb-0">
        <section className="">
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Book-Blog</h6>
              <p>We are a team of book lovers who are passionate about sharing our thoughts and recommendations with fellow readers.</p>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Links</h6>
              <p><a href='/' className="text-white">Book-Blog</a></p>
              <p><a href='/discover' className="text-white">Discover</a></p>
              <p><a href='/add' className="text-white">Add Review</a></p>
              <p><a href='/about' className="text-white">About Us</a></p>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p><FontAwesomeIcon icon={faHome} className="mr-3" /> Jaipur, RJ 302020, IN</p>
              <p><FontAwesomeIcon icon={faEnvelope} className="mr-3" /> bookblogbymt@gmail.com</p>
              <p><FontAwesomeIcon icon={faPhone} className="mr-3" /> + 01 234 567 88</p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
              <a href="https://github.com/taniishkaaa/Book-Blog" target="_blank" rel="noopener noreferrer" role="button"><GitHubIcon className="footer-icon" /></a>
              
            </div>
          </div>
        </section>
      </div>
      <div className="text-center p-3 copyright">
        Copyright ⓒ {year}:
        <a className="text-white" href="/"> Book-Blog</a>
      </div>
    </footer>
  );
}

export default Footer;
