import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthContext } from '../Context/AuthContext';

function SignIn() {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useHistory();
    const { isAuth, setAuth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/sign-in", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            setAuth(true);
            history.push("/");
        } else {
            alert("Invalid Credentials")
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }

    return (
        <MDBContainer fluid style={{ marginTop: '100px' }}>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px', backgroundColor: '#F5F5DC' }}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                            <h2 className="fw-bold mb-2 text-center" style={{ color: '#361a03' }}>Sign In</h2>

                            <form method="POST" action="/sign-in" onSubmit={handleSubmit}>
                                <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='email' name='email' value={credentials.email} onChange={onChange} type='email' size="lg" />
                                <MDBInput wrapperClass='mb-4 w-100' label='Password' id='password' name='password' value={credentials.password} onChange={onChange} type='password' size="lg" />

                                <MDBBtn type='submit' className="mb-2 w-100" size='lg' style={{ backgroundColor: '#361a03', color: '#F5F5DC', boxShadow: 'none' }} >
                                    Sign In
                                </MDBBtn>
                            </form>
                            <hr className="my-4" style={{ color: '#361a03' }} />

                            <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#361a03', color: '#F5F5DC', boxShadow: 'none' }}>
                                <GoogleIcon style={{ color: '#F5F5DC' }} /> Sign in with google
                            </MDBBtn>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

export default SignIn;