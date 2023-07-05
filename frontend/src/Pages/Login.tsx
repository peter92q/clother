import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { signinUser } from '../Configs/Redux/accountSlice';
import { useAppSelector, useAppDispatch } from '../Configs/Redux/store';
import { BeatLoader } from 'react-spinners';
import { useState } from 'react';
import { button } from '../Utils/Button';

export default function Login() {
  const { user } = useAppSelector((state) => state.account);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  });

  async function submitForm(data: FieldValues) {
    const response: any = await dispatch(signinUser(data));
    console.log('response', response);
    if (response.payload?.id && response.payload?.token) {
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo);
    } else {
      setError('Invalid credentials.');
    }
  }

  return (
    <>
      {!user ? (
        <div className="h-[82vh] lg:mt-20 mt-10 px-2">
          <Container
            component={Paper}
            maxWidth="sm"
            className="flex flex-col items-center p-4 border-[0.01rem] border-gray-400/40"
          >
            <div className="w-full flex flex-col items-center">
              <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
            <Box
              component="form"
              onSubmit={handleSubmit(submitForm)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                label="Username"
                autoFocus
                {...register('username', { required: 'Username required' })}
                error={!!errors.username}
                helperText={errors?.username?.message as string}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                {...register('password', { required: 'Password required' })}
                error={!!errors.password}
                helperText={errors?.password?.message as string}
              />
              <button
                disabled={!isValid}
                type="submit"
                className={`${button} w-full rounded-md my-2 h-[50px]`}
              >
                {isSubmitting ? <BeatLoader color="#ffffff" /> : 'Sign In'}
              </button>
              {error && (
                <div className="text-red-500 w-full text-center justify-center items-center text-[18px]">
                  {error}
                </div>
              )}
              <Grid container>
                <Grid item>
                  <Link to="/register" className="flex flex-row mt-1">
                    Don't have an account?&nbsp;
                    <p className="underline">Sign up!</p>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
      ) : (
        <div className="h-[100vh] text-[25px] flex flex-row justify-center items-center">
          <h1>Already logged in!</h1>&nbsp;
          <Link to="/">
            <p className="underline">Back to homepage.</p>{' '}
          </Link>
        </div>
      )}
    </>
  );
}
