import React, { useState }  from 'react';
import {  Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { register } from '../actions/auth';

const Register = ({ register, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { name, email, password, re_password } = formData;

    const onChange = e => setFormData ({...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        
        if (password === re_password){
            register (name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/" />
    }
    if (accountCreated) {
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
                        placeholder='请输入用户名'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">电子邮箱</label>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='请输入电子邮箱'
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
                        placeholder='请输入密码'
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
                        placeholder='请再次输入您的密码'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>

                <div class="form-check d-flex justify-content-center mb-4">
                    <input class="form-check-input me-2 bg-dark" type="checkbox" value="" id="registerCheck" checked
                        aria-describedby="registerCheckHelpText" />
                    <label class="form-check-label" for="registerCheck">
                        我同意以上条款
                    </label>
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-dark" type="submit">注 册</button>
                </div>


            </form>

        </div>









    );

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);