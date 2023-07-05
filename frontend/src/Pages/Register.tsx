import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LockOutlined } from '@mui/icons-material';
import agent from '../Configs/Axios/axios';
import { useAppSelector } from '../Configs/Redux/store';
import { BeatLoader } from 'react-spinners';
import { button } from '../Utils/Button';

export default function Register() {
  const { user } = useAppSelector((state) => state.account);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  });

  function handleApiErrors(errors: any) {
    console.log(errors);
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('Password')) {
          setError('password', { message: error });
        } else if (error.includes('Email')) {
          setError('email', { message: error });
        } else if (error.includes('Username')) {
          setError('username', { message: error });
        }
      });
    }
  }

  return (
    <>
      {!user ? (
        <div className="h-[82vh] lg:mt-20 mt-10 px-2">
          <Container
            component={Paper}
            maxWidth="sm"
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            className="border-[0.01rem] border-gray-400/40"
          >
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit((data) =>
                agent.Account.register(data)
                  .then(() => {
                    navigate('/login');
                  })
                  .catch((error) => handleApiErrors(error))
              )}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                autoFocus
                {...register('username', { required: 'Username is required' })}
                error={!!errors.username}
                helperText={errors?.username?.message as string}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                    message: 'Not a valid email address',
                  },
                })}
                error={!!errors.email}
                helperText={errors?.email?.message as string}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                {...register('password', {
                  required: 'password is required',
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                    message: 'Password does not meet complexity requirements',
                  },
                })}
                error={!!errors.password}
                helperText={errors?.password?.message as string}
              />
              <button
                disabled={!isValid}
                type="submit"
                className={`${button} w-full my-1 h-[50px] ${
                  !isValid && 'opacity-60 pointer-events-none'
                }`}
              >
                {isSubmitting ? <BeatLoader color="#ffffff" /> : 'Register'}
              </button>
              <Grid container>
                <Grid item>
                  <Link to="/login" className="w-full flex flex-row">
                    Already have an account?&nbsp;{' '}
                    <p className="underline">Sign In</p>
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
