import React, { useState }  from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { reset_password } from '../actions/auth';

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email } = formData;

    const onChange = e => setFormData ({...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        
        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to="/" />
    }

    return (
        <div className='container mt-5 container-sm'>
            <h1>Reset Password？</h1>
            <form onSubmit={e => onSubmit(e)}>
            <div class="my-3">
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-dark" type="submit">Submit</button>
                </div>
            </form>

        </div>
    );

};



export default connect(null, { reset_password })(ResetPassword);