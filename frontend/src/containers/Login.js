import React, { useState }  from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData ({...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        
        login (email, password)
    };

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <div className='container mx-auto' style={{ width: '500px', marginTop: '100px' }}>

            <form onSubmit={e => onSubmit(e)}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
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

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                            className='form-control'
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required
                    />
                </div>

                <div class="row mb-4">
                    <div class="col d-flex justify-content-between">
                        <div class="form-check">
                            <input class="form-check-input bg-dark" type="checkbox" value="" id="form2Example31" checked />
                            <label class="form-check-label" for="form2Example31"> 记住我 </label>
                        </div>
                    </div>        
                    <div class="col">
                        <Link className='link-secondary' to='/reset-password'>忘记密码？</Link>
                    </div>
                </div>
            
                <div class="d-grid gap-2">
                <button className='btn btn-dark' type='submit'>登 录</button>
                </div>

                <div class="text-center mt-3">
                    <p>Don't have an account?    <Link className='link-secondary' to='/register'>注 册</Link></p>
                </div>

            </form>


        </div>
    );

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);