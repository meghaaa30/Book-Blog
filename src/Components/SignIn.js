import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthContext } from '../Context/AuthContext';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function SignIn() {
    const [message, setMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('danger');
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    let history = useHistory();
    let location = useLocation();
    const { setIsAuth } = useContext(AuthContext);
    const { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: 'email',
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const response = await fetch("http://localhost:5000/api/auth/sign-in", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('auth-token', json.authtoken);
                setIsAuth(true);
                history.replace(from);
            } else {
                setAlertVariant('danger');
                if (json.error) {
                    setMessage(json.error);
                }
            }
        } catch (error) {
            setAlertVariant('danger');
            setMessage('An error occurred during sign in. Please try again later.');
            console.error('Sign in error:', error);
        }
        setLoading(false);
    };

    const onChange = (e) => {
        setMessage('');
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const sendGoogleToken = async (tokenId) => {
        setLoading(true);
        setMessage('');
        try {
            const response = await fetch('http://localhost:5000/api/auth/googlelogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken: tokenId }),
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('auth-token', json.authtoken);
                setIsAuth(true);
                history.replace(from);
            } else {
                setAlertVariant('danger');
                setMessage('Google sign-in failed. Please try again.');
            }
        } catch (error) {
            setAlertVariant('danger');
            setMessage('Google sign-in error. Please try again later.');
            console.error('Google sign-in error:', error);
        }
        setLoading(false);
    };

    const responseGoogle = (response) => {
        if (response.tokenId) {
            sendGoogleToken(response.tokenId);
        } else {
            setAlertVariant('danger');
            setMessage('Google sign-in error. Please try again.');
        }
    };

    return (
        <MDBContainer fluid style={{ marginTop: '50px' }}>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
                    <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px', backgroundColor: '#F5F5DC' }}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                            <h2 className="fw-bold mb-2 text-center" style={{ color: '#361a03' }}>Sign In</h2>
                            {message && <Alert variant={alertVariant} className='mt-3'>{message}</Alert>}
                            <form onSubmit={handleSubmit} method="POST" action="/sign-in">
                                <MDBInput
                                    wrapperClass='mb-4 w-100'
                                    label='Email address'
                                    id='email'
                                    name='email'
                                    type='email'
                                    size="lg"
                                    value={credentials.email}
                                    onChange={onChange} />
                                <MDBInput
                                    wrapperClass='mb-4 w-100'
                                    label='Password'
                                    id='password'
                                    name='password'
                                    type='password'
                                    size="lg"
                                    value={credentials.password}
                                    onChange={onChange}
                                    required
                                    minLength={8} />
                                <MDBBtn type='submit' className="mb-2 w-100" size='lg' style={{ backgroundColor: '#361a03', color: '#F5F5DC', boxShadow: 'none' }} disabled={loading}>
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Sign In'}
                                </MDBBtn>
                            </form>
                            <p className="mb-0" style={{ color: '#361a03' }}>Don't have an account? <NavLink to={{ pathname: "/sign-up", state: { from: location.state?.from || "/" } }} className='fw-bold mb-2 sign-up-link'>Sign Up</NavLink></p>
                            <hr className="my-4" style={{ color: '#361a03' }} />
                            <GoogleLogin
                                clientId={clientId}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                render={(renderProps) => (
                                    <MDBBtn
                                        type='button'
                                        className="mb-2 w-100"
                                        size="lg"
                                        style={{ backgroundColor: '#361a03', color: '#F5F5DC', boxShadow: 'none' }}
                                        onClick={() => {
                                            setMessage('');
                                            renderProps.onClick();
                                        }}
                                        disabled={renderProps.disabled || loading}
                                    >
                                        {loading ? <Spinner animation="border" size="sm" /> : <><GoogleIcon style={{ color: '#F5F5DC' }} /> Sign in with Google</>}
                                    </MDBBtn>
                                )}
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default SignIn;
