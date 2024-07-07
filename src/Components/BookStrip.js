import React, { useState, useEffect, useContext } from 'react';
import fetchBooks from '../helpers/fetchBooks';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { BrowserRouter, Link, Route, Switch, useHistory } from "react-router-dom";
import { MDBBtn } from 'mdb-react-ui-kit';
import { AuthContext } from '../Context/AuthContext';
import aboutImage from '../assets/images/about.jpg';
import infoImage from '../assets/images/info.avif';
import testimonialImage from '../assets/images/testimonial.jpg';

function BookStrip() {
    const [allBooks, setAllBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const { isAuth } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchBooks();
            if (data) {
                setAllBooks(data);
                const initialBooks = data.slice(0, 9);
                setDisplayedBooks(initialBooks);
                setCurrentIndex(0);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (allBooks.length === 0) return;

            let newBooks = [...displayedBooks];
            const randomIndex = Math.floor(Math.random() * newBooks.length);
            let randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
            while (newBooks.includes(randomBook)) {
                randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
            }
            newBooks[randomIndex] = randomBook;
            setDisplayedBooks(newBooks);
            setCurrentIndex(randomIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [allBooks, displayedBooks]);

    const handleClick = (title) => {
        history.push({
            pathname: "/reviews",
            search: `?title=${encodeURIComponent(title.toLowerCase())}`,
            state: { title: title.toLowerCase() }
        });
    };

    return (
        <BrowserRouter forceRefresh={true}>
            <div className="about-us">
                <div className="about-image-container">
                    <img src={aboutImage} alt="" className='img-fluid shadow-4 about-image' />
                    <div className="about-text-overlay">
                        <div className="bookstrip-container">
                            <div className="bookstrip-header">
                                <div>
                                    <h1 className="bookstrip-title">
                                        Book-Blog
                                    </h1>
                                    <p className="bookstrip-subtitle">
                                        Discover your next favorite book with
                                    </p>
                                    <p className="bookstrip-subtitle" style={{ paddingBottom: '20px' }}>
                                        our insightful reviews.
                                    </p>
                                    {!isAuth ? (
                                        <div className="buttons">
                                            <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                                                <MDBBtn
                                                    className="bookstrip-signup-button"
                                                    size='lg'
                                                >
                                                    Sign Up
                                                </MDBBtn>
                                            </Link>

                                            <MDBBtn
                                                className="bookstrip-signin-button"
                                                size='lg'
                                            >
                                                <Link to="/sign-in">Sign In</Link>
                                            </MDBBtn>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="bookstrip-grid">
                                {displayedBooks.map((book, index) => (
                                    book && book.coverUrl ? (
                                        <div
                                            key={index}
                                            className="bookstrip-book"
                                            style={{
                                                opacity: index === currentIndex ? 0 : 1,
                                            }}
                                        >
                                            <img
                                                src={book.coverUrl}
                                                alt={book.title}
                                                onClick={() => handleClick(book.title)}
                                            />
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </div>
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
                        <p>Our reviews are not just critiques; they're love letters to literature, designed to guide you to your next literary adventure.</p>
                    </div>
                    <img src={testimonialImage} alt="" />
                </div>
            </div>
            <Switch>
                <Route path="/sign-up" component={SignUp}></Route>
                <Route path="/sign-in" component={SignIn}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default BookStrip;