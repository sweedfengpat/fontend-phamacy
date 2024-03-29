import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import axios from "axios";
import { baseURL } from 'lib/url';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


function Forgot() {

  const [alertError, setAlertError] = React.useState<number>(200);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = new FormData();
    formData.append('email', data.get('email') || '');
    if (data.get('email') !== '') {
      axios.post(`${baseURL}/forgot-password`, formData)
        .then((response: any) => {
          if (response.data.code === 500) {

            setAlertError(500);
          } else {
            alert('Check your email for your password. If it doesn’t appear within a few minutes, check your spam folder.');
            window.location.href = '/auth/sign-in';
          }
        });
    } else {
      setAlertError(500);
    }
  };

  return (
        <div className='mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start'>
          <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {(() => {
              if (alertError !== 200) {
                return (<>
                  <Alert severity="error" sx={{ mb: '1rem' }}>Email not found</Alert>
                </>)
              }
            })()}
            <div className="cto-InputAddress1">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/auth/sign-in" variant="body2">
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </div>
  );
}

export default Forgot