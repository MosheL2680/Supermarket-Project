import axios from 'axios';
import { MDBBtn, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ResetPass = () => {
    const [Email, setEmail] = useState("")
    const SERVER = 'https://super-django-1.onrender.com/'

    const reset = () => {
        if (!Email) {
            toast.error('Please enter your email');
            return;
        }
        toast.promise(
            axios.post(SERVER + 'forgotpass', { email: Email })
                .then(res => {
                    toast.success('We sent you a reset link to yuor email')
                })
                .catch((error) => {
                    toast.error(`some error - validation not implemented yet`)
                }),
            { pending: 'Proccessing...' }
        )
    }



    return (
        <div style={{ textAlign: 'center' }}>
            <br /><h2>Reset password</h2>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' onChange={(e) => setEmail(e.target.value)} />

                <MDBBtn className="mb-4" onClick={() => reset()}>Send reset Email</MDBBtn>

            </MDBContainer>
        </div>
    );
}

export default ResetPass