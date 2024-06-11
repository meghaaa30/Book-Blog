import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthContext } from '../Context/AuthContext';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function SignUp() {
    const [message, setMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('danger');
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
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
        try {
            const response = await fetch("http://localhost:5000/api/auth/sign-up", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            const json = await response.json();
            if (response.ok) {
                localStorage.setItem('auth-token', json.authtoken);
                setIsAuth(true);
                setMessage('Sign up successful!');
                setAlertVariant('success');
                setCredentials({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                });
                setTimeout(() => {
                    setMessage('');
                    history.replace(from);
                }, 1000);
            } else {
                setAlertVariant('danger');
                setMessage(json.error || 'Sign up failed. Please try again.');
            }
        } catch (error) {
            setAlertVariant('danger');
            setMessage('An error occurred during sign up. Please try again later.');
            console.error('Sign up error:', error);
        } finally {
            setLoading(false);
        }
    };

    const onChange = (e) => {
        setMessage('');
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const sendGoogleToken = async (tokenId) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/googlelogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken: tokenId }),
            });
            const json = await response.json();
            if (response.ok) {
                localStorage.setItem('auth-token', json.authtoken);
                setIsAuth(true);
                setMessage('Google login successful!');
                setAlertVariant('success');
                setTimeout(() => {
                    setMessage('');
                    history.replace(from);
                }, 1000);
            } else {
                setAlertVariant('danger');
                setMessage(json.error || 'Google login failed. Please try again.');
            }
        } catch (error) {
            setAlertVariant('danger');
            setMessage('An error occurred during Google login. Please try again later.');
            console.error('Google login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const responseGoogle = (response) => {
        sendGoogleToken(response.tokenId);
    };

    return (
        <MDBContainer fluid style={{ marginTop: '50px' }}>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
                    <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px', backgroundColor: '#F5F5DC' }}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                            <h2 className="fw-bold mb-2 text-center" style={{ color: '#361a03' }}>Sign Up</h2>
                            {message && <Alert variant={alertVariant} className='mt-3'>{message}</Alert>}
                            <form onSubmit={handleSubmit}>
                                <MDBInput
                                    wrapperClass='mb-4 w-100'
                                    label='First Name'
                                    id='firstName'
                                    name='firstName'
                                    type='text'
                                    size="lg"
                                    value={credentials.firstName}
                                    onChange={onChange} />
                                <MDBInput
                                    wrapperClass='mb-4 w-100'
                                    label='Last Name'
                                    id='lastName'
                                    name='lastName'
                                    type='text'
                                    size="lg"
                                    value={credentials.lastName}
                                    onChange={onChange} />
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
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                                </MDBBtn>
                            </form>
                            <p className="mb-0" style={{ color: '#361a03' }}>Already have an account? <NavLink to={{ pathname: "/sign-in", state: { from: location.state?.from || "/" } }} className='fw-bold mb-2 sign-up-link'>Sign In</NavLink></p>
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
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled || loading}
                                    >
                                        {loading ? <Spinner animation="border" size="sm" /> : <><GoogleIcon style={{ color: '#F5F5DC' }} /> Sign Up with Google</>}
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

export default SignUp;
