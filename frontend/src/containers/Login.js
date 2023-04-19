import React, { useState, useEffect }  from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated, error }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const { email, password, rememberMe } = formData;

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        if (storedEmail && storedPassword) {
          setFormData({ email: storedEmail, password: storedPassword, rememberMe: true });
        }
      }, []);

      const onChange = e => {
        if (e.target.name === 'rememberMe') {
          setFormData({ ...formData, rememberMe: e.target.checked });
        } else {
          setFormData({ ...formData, [e.target.name]: e.target.value }); 
        }
      }

    const onSubmit = e => {
        e.preventDefault();
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        login(email, password);
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
                            <input class="form-check-input" type="checkbox" name="rememberMe" onChange={e => onChange(e)} checked={rememberMe} />
                            <label class="form-check-label" for="rememberMe"> Remember Me </label>
                        </div>
                    </div>        
                    <div class="col">
                        <Link className='link-secondary' to='/reset-password'>Forgot Password?</Link>
                    </div>
                </div>
            
                <div class="d-grid gap-2">
                <button className='btn btn-dark' type='submit'>Login</button>
                </div>

                <div class="text-center mt-3">
                    <p>Don't have an account?    <Link className='link-secondary' to='/register'>Register</Link></p>
                </div>
                {error && ( <div className="alert alert-danger mt-3" role="alert">{error}</div>)}

            </form>
        </div>
    );

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error 
});

export default connect(mapStateToProps, { login })(Login);