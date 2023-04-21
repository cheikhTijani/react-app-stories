import React, { useEffect, useRef, useState } from 'react'
import { connect } from "react-redux";
import { signIn } from '../actions';
import history from '../history';

const credentials = {
    email: process.env.REACT_APP_email,
    password: process.env.REACT_APP_password,
    sub: process.env.REACT_APP_sub,
    given_name: process.env.REACT_APP_given_name
}

function Login({ isSignedIn, signIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [online, setOnline] = useState(false);

    const errorRef = useRef(null);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/')
        }
    }, [isSignedIn])

    const handleSubmit = (e) => {
        e.preventDefault();
        errorRef.current.textContent = '';
        if (email.trim() === '' || password.trim() === '') {
            errorRef.current.textContent = 'Email and Password are required';
        } else if (email !== credentials.email || password !== credentials.password) {
            errorRef.current.textContent = 'Wrong Email or/and Password';
        }
        if (email === credentials.email && password === credentials.password) {
            errorRef.current.textContent = ''
            sessionStorage.setItem("token", JSON.stringify(credentials));
            signIn(JSON.parse(sessionStorage.getItem("token")));
            if (!online) setOnline(true)
        }
    }

    return (
        <div className='app-child loginConatainer'>
            <form onSubmit={handleSubmit} className='ui form'>
                <h3 className='page-title'>Login</h3>
                <p className='page-title-secondary text-center'>Login to start reading and sharing stories</p>
                <p className='login-error' ref={errorRef}></p>
                <div className='field loginField'>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                    />
                </div>

                <div className='field loginField'>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                </div>
                <div className='text-center' style={{ marginTop: 30 }}>
                    <button type='submit' className='ui button primary Btn'>Login</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn })(Login);
