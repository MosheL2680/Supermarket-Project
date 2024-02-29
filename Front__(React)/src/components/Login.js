import React, { useContext, useEffect, useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSignOutAlt } from 'react-icons/fa';
import { Context } from '../App';

const Login = () => {
    const [uName, setuName] = useState("");
    const [pwd, setpwd] = useState("");
    const [token, settoken] = useState("");
    const {uservalue} = useContext(Context)
    const [user, setuser] = uservalue
    const navigate = useNavigate();
    const SERVER = "https://super-django-1.onrender.com/"
    
    //if token allready exist in storage, set it as the token var
    useEffect(() => {
        const existingToken = sessionStorage.getItem('token');
        if (existingToken) {
            settoken(existingToken);
        }
    }, []);

    const doLogin = () => {
        if (!uName || !pwd) {
            //make user fullfield all fields
            toast.error('Username and password are required');
            return;
        }
        toast.promise(
            axios.post(SERVER + 'login/', { username: uName, password: pwd })
                .then(res => {
                    const tempToken = res.data.access
                    settoken(tempToken);
                    sessionStorage.setItem('token', tempToken) //save token to session storage
                    const object = JSON.parse(atob(tempToken.split('.')[1]))//decode token
                    setuser(object.username)//set username from token
                    toast(`you are logged in now`)
                    navigate('/categories');
                })
                .catch((error) => {
                    toast.error(`username or password isn't correct`)// handle error
                }),
            { pending: 'Processing login...' }
        )
    }

    const LogOut = () => {
        axios.get(SERVER + 'logout/').then(
            sessionStorage.removeItem('token'),//del token from s. storage
            setuser('user'),
            toast(`You've been logged out. Goodbye:)`),
            navigate('/')
        )
    }

    // const goToReset = () => {
    //     navigate('/resetpass')
    // }

    //return when there is token (and user is logged in)    
    if (token !== "") {
        return <div>
            <h1>You're logged in {user}</h1>
            <Link to={'/categories'}>back to shop</Link>
            <br /><br />
            <MDBBtn onClick={() => LogOut()}><FaSignOutAlt /> Log Out</MDBBtn>
        </div>;
    }
    //return when not logged in
    return (
        <>
            <br /><h2>Login</h2>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' onChange={(e) => setuName(e.target.value)} />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setpwd(e.target.value)} />

                {/* <div className="d-flex justify-content-between mx-3 mb-4">
                    <Link onClick={()=>goToReset()}>Forgot password?</Link>
                </div> */}

                <MDBBtn className="mb-4" onClick={doLogin}>Sign in</MDBBtn>

                <div className="text-center">
                    <p>Not a member? <Link to={'/register'}>Register</Link></p>
                </div>
            </MDBContainer>
        </>
    );
}

export default Login;
