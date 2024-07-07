import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import testimonial from '../assets/images/testimonial.jpg';
import Footer from './Footer';
import '../styles/Footer.css';

function About() {
    return (
        <div>
            <div className="about">
                <div className="about-book-blog">
                    <h1 className="about-book-blog-title">About Book-Blog</h1>
                    <img className='mt-image' src={testimonial} alt='' />
                </div>
            </div>
            <div className='our-story'>
                <h1 className='our-story-title'>Our Story</h1>
                <p className='our-story-text'>In April 2024, two passionate readers, driven by their love for books and the joy of discovery, embarked on a journey to create something extraordinary. Fueled by countless nights of shared stories and animated discussions about their latest reads, they envisioned a place where fellow book lovers could come together. This dream materialized into the Book-Blog project—a vibrant book-review website designed to help readers uncover their next favorite books. With honest and insightful reviews spanning bestsellers to hidden gems across various genres, Book-Blog celebrates the joy of reading and fosters a community where literature thrives. Join us in this literary adventure, where each review is crafted with passion and every book is a new discovery waiting to be explored.</p>
            </div>
            <hr className='hr-line' />
            <div className='team'>
                <h1 className='team-title'>Meet Our Team</h1>
                <div className='team-members'>
                    <div className='megha'>
                        <img className='member-img' src={testimonial} alt='' />
                        <p className='name'>Megha Sharma</p>
                        <p className='designation'>Founder</p>
                        <p><FontAwesomeIcon icon={faEnvelope} className="mr-3" /> meghasharma4982@gmail.com</p>
                        <a href="https://github.com/meghaaa30" target="_blank" rel="noopener noreferrer" role="button"><GitHubIcon className="social-link" /></a>
                        <a href="http://www.linkedin.com/in/megha-sharma-597a80222" target="_blank" rel="noopener noreferrer" role="button"><LinkedInIcon className="social-link" /></a>
                    </div>
                    <div className='tanishka'>
                        <img className='member-img' src={testimonial} alt='' />
                        <p className='name'>Tanishka Singh</p>
                        <p className='designation'>Founder</p>
                        <p><FontAwesomeIcon icon={faEnvelope} className="mr-3" /> tanishkasingh2004@gmail.com</p>
                        <a href="https://github.com/taniishkaaa" target="_blank" rel="noopener noreferrer" role="button"><GitHubIcon className="social-link" /></a>
                        <a href="https://www.linkedin.com/in/tanishka-singh-a42571228/" target="_blank" rel="noopener noreferrer" role="button"><LinkedInIcon className="social-link" /></a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
