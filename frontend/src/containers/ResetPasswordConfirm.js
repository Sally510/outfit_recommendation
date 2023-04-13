import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const params = useParams();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        const { uid, token } = params;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
        <div className='container mx-auto' style={{ width: '500px', marginTop: '100px' }}>
            <form onSubmit={e => onSubmit(e)}>
                <div class="mb-3">
                    <label for="password" class="form-label">新密码</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='请输入新密码'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">确认新密码</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='请再次输入您的密码'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-dark" type="submit">重 置 密 码</button>
                </div>
             </form>
        </div>           
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
