import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../State/Auth/Action';
import { toast} from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    React.useEffect(() => {
        if (auth.error) {
            toast.error(auth.error);
        } else if (auth.jwt) {
            toast.success('Sign up successful!');
            navigate('/');
        }
    }, [auth, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const userData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            mobile: data.get('mobile'),
            password: data.get('password'),
            email: data.get('email'),
        };
        dispatch(register(userData));
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField required id='firstName' name='firstName' label="First Name" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField required id='lastName' name='lastName' label="Last Name" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField required id='mobile' name='mobile' label="Your Number" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField required type='password' id='password' name='password' label="Your Password" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required type='email' id='email' name='email' label="Your Email" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained' size='large' color='primary'>Sign Up</Button>
                    </Grid>
                </Grid>
            </form>
            <div className="flex justify-center flex-col items-center">
                <div className='py-3 flex items-center'>
                    <p>If you already have an account <Button onClick={() => navigate('/login')}>Login</Button></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
