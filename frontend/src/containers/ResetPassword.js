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
            <h1>确认修改密码？</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
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
                <button className='btn btn-primary' type='submit'>提交申请</button>
            </form>

        </div>
    );

};



export default connect(null, { reset_password })(ResetPassword);