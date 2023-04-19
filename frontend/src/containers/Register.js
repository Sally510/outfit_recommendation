import React, { useState }  from 'react';
import {  Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { register } from '../actions/auth';

const Register = ({ register, isAuthenticated, error }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: '',
    });

    const { name, email, password, re_password } = formData;

    const onChange = e => setFormData ({...formData, [e.target.name]: e.target.value });

    const onSubmit = async  e => {      
        e.preventDefault();
        
        await register (name, email, password, re_password);


        setAccountCreated(true);
    };
    console.log(accountCreated, error);
    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    if (accountCreated && !error) {
        return <Navigate to="/login" />
    } 

    return (
        <div className='container mx-auto' style={{ width: '500px', marginTop: '50px' }}>

            <form onSubmit={e => onSubmit(e)}>
                <div class="mb-3">
                    <label for="name" class="form-label">用户名</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='用户名'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">邮箱</label>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='邮箱'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">密码</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='密码'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">确认密码</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='确认密码'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>

                <div class="d-grid gap-2 my-3">
                    <button class="btn btn-dark" type="submit">注册</button>
                </div>

                {error && ( <pre className="alert alert-danger mt-3" role="alert">{error}</pre>)}
            </form>

        </div>
    );

};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error 
});

export default connect(mapStateToProps, { register })(Register);