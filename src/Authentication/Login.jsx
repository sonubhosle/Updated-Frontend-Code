import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../State/Auth/Action';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    React.useEffect(() => {
        if (auth.error) {
            toast.error(auth.error);
        } else if (auth.jwt) {
            toast.success('Login successful!');
        }
    }, [auth, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        };
        dispatch(login(userData));
    };

    return (
        <div>
            <ToastContainer   className="custom-toast-container" />
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField required type='email' id='email' name='email' label="Your Email" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required type='password' id='password' name='password' label="Your Password" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained' size='large' color='primary'>Login</Button>
                    </Grid>
                </Grid>
            </form>
            <div className="flex justify-center flex-col items-center">
                <div className='py-3 flex items-center'>
                    <p>Don't have an account? <Button onClick={() => navigate('/signup')}>Sign Up</Button></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
