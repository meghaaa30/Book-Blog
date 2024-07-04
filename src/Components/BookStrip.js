import React, { useState, useEffect, useContext } from 'react';
import fetchBooks from '../helpers/fetchBooks';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { BrowserRouter, Link, Route, Switch, useHistory } from "react-router-dom";
import { MDBBtn } from 'mdb-react-ui-kit';
import { AuthContext } from '../Context/AuthContext';

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
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
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
                        <div
                            key={book.key}
                            className="book"
                            style={{
                                opacity: index === currentIndex ? 0 : 1, // Fade out/in based on index
                                transition: 'opacity 1s ease-in-out', // CSS transition for fading effect
                            }}
                        >
                            <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">
                                <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt={book.title} style={{ width: '130px', height: '180px' }} />
                            </a>
                        </div>
                    ))}
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