import React, { useState }  from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { verify } from '../actions/auth';

const Activate = ({ verify }) => {
    const params = useParams();

    const [verified, setVerified] = useState(false);

    const verify_account = e => {

        const { uid, token } = params;
        
        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Navigate to="/" />
    }

    return (
        <div className='container mx-auto' style={{ width: '500px', marginTop: '100px' }}>
            <h1>认证你的账号:</h1>
            <div class="d-grid gap-2 my-5">
                <button onClick={verify_account} type='button' className='btn btn-dark'>认 证</button>
            </div>
        </div>
    );

};


export default connect(null, { verify })(Activate);