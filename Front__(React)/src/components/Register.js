import axios from 'axios';
import { MDBBtn, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../App';

const Register = () => {
  const [token, settoken] = useState("");
  const [uName, setuName] = useState("");
  const [pwd, setpwd] = useState("");
  const [Email, setEmail] = useState("")
  const { uservalue } = useContext(Context)
  const [user, setuser] = uservalue
  const navigate = useNavigate();
  const SERVER = 'https://super-django-1.onrender.com/'

  const doRegister = () => {
    if (!uName || !pwd || !Email) {
      toast.error('All fields are required');
      return; //make user to fullfield all fields
    }
    toast.promise(
      axios.post(SERVER + 'register', { username: uName, password: pwd, email: Email }).then(res => {
        toast.success('user created successfuly!')
        axios.post(SERVER + 'login/', { username: uName, password: pwd })//login automatically if register successful
          .then(res => {
            const tempToken = res.data.access
            settoken(tempToken);
            sessionStorage.setItem('token', tempToken);
            const object = JSON.parse(atob(tempToken.split('.')[1]))
            setuser(object.username)
            toast(`you are logged in now`)
            navigate('/categories');
          });
      }),
      { pending: 'Proccessing...' }
    )
  }



  return (
    <div style={{ textAlign: 'center' }}>
      <br /><h2>Sign Up</h2>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' onChange={(e) => setuName(e.target.value)} />
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setpwd(e.target.value)} />
        <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' onChange={(e) => setEmail(e.target.value)} />

        <MDBBtn className="mb-4" onClick={() => doRegister()}>Sign Up</MDBBtn>

      </MDBContainer>
    </div>
  );
}

export default Register