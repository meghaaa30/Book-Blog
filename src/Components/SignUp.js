import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthContext } from '../Context/AuthContext';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function SignUp() {
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
        const response = await fetch("http://localhost:5000/api/auth/sign-up", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('auth-token', json.authtoken);
            setIsAuth(true);
            history.replace(from);
        } else {
            alert("Invalid Credentials")
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const sendGoogleToken = async (tokenId) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/googlelogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `Bearer ${tokenId}`,
                },
                body: JSON.stringify({ idToken: tokenId }),
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem('auth-token', json.authtoken);
                setIsAuth(true);
                history.replace(from);
            } else {
                alert('Google Sign-Up failed');
            }
        } catch (error) {
            console.log('GOOGLE SIGNUP ERROR', error);
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
                            <form onSubmit={handleSubmit} method="POST" action="/sign-up">
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

                                <MDBBtn type='submit' className="mb-2 w-100" size='lg' style={{ backgroundColor: '#361a03', color: '#F5F5DC', boxShadow: 'none' }} >
                                    Sign Up
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
                                        type='submit'
                                        className="mb-2 w-100"
                                        size="lg"
                                        style={{ backgroundColor: '#361a03', color: '#F5F5DC', boxShadow: 'none' }}
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    >
                                        <GoogleIcon style={{ color: '#F5F5DC' }} /> Sign up with Google
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
