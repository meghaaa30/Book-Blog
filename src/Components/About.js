import React from 'react';
import aboutImage from '../assets/images/about.jpg';
import infoImage from '../assets/images/info.avif';
import testimonialImage from '../assets/images/testimonial.jpg';
import Footer from './Footer';
import '../styles/Footer.css';

function About() {
    return (
        <div className="about-us">
            <div className="about-image-container">
                <img src={aboutImage} alt="" className='img-fluid shadow-4 about-image' />
                <div className="about-text-overlay">
                    <h1 className='about-text'>About Book-Blog</h1>
                </div>
            </div>
            <div className='quote'>
                <p className='quote-text'>"A reader lives a thousand lives before he dies." -George R. R. Martin</p>
            </div>
            <div className='info'>
                <img src={infoImage} alt="" className='info-image' />
                <div className='info-text'>
                    <h2>For the readers, by the readers.</h2>
                    <br></br>
                    <p>Reading is a delightful journey that transports you to different worlds, offering an escape from reality and a chance to live countless lives through the eyes of various fascinating characters, and allows you to explore new ideas and perspectives. The joy of reading lies in its ability to ignite your imagination, evoke emotions, and leave a lasting impact long after you've turned the last page.</p>
                    <br></br>
                    <p>Ours is a vibrant community where fellow book lovers come together to share their passion for reading. Here, you'll find honest and insightful reviews on a wide range of books, from bestsellers to hidden gems, across various genres. Our platform is dedicated to helping you discover your next great read. Join us in celebrating the joy of reading and uncovering the treasures hidden within the pages of every book. Happy reading!</p>
                </div>
            </div>
            <div className='testimonial'>
                <div className='testimonial-text'>
                    <h2>Radically transparent;</h2>
                    <h2>crafted with passion.</h2>
                    <br></br>
                    <p>Our reviews are not just critiques; they're love letters to literature, designed to guide you to your next literary adventure.</p>
                </div>
                <img src={testimonialImage} alt="" />
            </div>
            <Footer />
        </div>
    );
};

export default About;
