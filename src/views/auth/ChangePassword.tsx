import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { baseURL } from "lib/url";
import { notification } from "antd";
import { TIMEOUT } from "dns";
import { notEqual } from "assert";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function ChangePassword() {
  const [password, setPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [newPassword1, setNewPassword1] = React.useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = new FormData();
    let e: any = localStorage.getItem("email");
    e = atob(e);
    const post_data = {
      password: data.get("password"),
      newPassword: data.get("newPassword"),
      newPassword1: data.get("newPassword1"),
      email: e,
    };
    formData.append("password", post_data.password as string);
    formData.append("newPassword", post_data.newPassword as string);
    formData.append("newPassword1", post_data.newPassword1 as string);
    formData.append("email", post_data.email as string);

    if (
      post_data.password !== "" &&
      post_data.newPassword !== "" &&
      post_data.newPassword1 !== "" &&
      post_data.newPassword !== post_data.newPassword1
    ) {
      alert("New Passwords do not match!");
    }
    if (
      post_data.password !== "" &&
      post_data.newPassword !== "" &&
      post_data.newPassword1 !== "" &&
      post_data.newPassword === post_data.newPassword1
    ) {
      axios
        .post(`${baseURL}/change-password`, formData)
        .then((response: any) => {

          if (response.data.code === 200) {
            notification.success({
              message: "Password Changed Successfully!",
              description: "Password Changed Successfully!",
            });
            setTimeout(() => {
              window.location.href = "/users/profile";
            }, 3000);
          } else if (response.data.code === 500) {
            notification.error({
              message: "Password is incorrect!",
              description: "Password is incorrect!",
            });
          }
        });
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    autoComplete="password"
                    name="password"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    autoFocus
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={newPassword}
                    onChange={(e: any) => setNewPassword(e.target.value)}
                    required
                    fullWidth
                    id="newPassword"
                    label="New Password"
                    name="newPassword"
                    autoComplete="newPassword"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={newPassword1}
                    onChange={(e: any) => setNewPassword1(e.target.value)}
                    required
                    fullWidth
                    id="newPassword1"
                    label="Confirm Password"
                    name="newPassword1"
                    autoComplete="newPassword"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Button
                color="success"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: "20px" }}
              >
                Change
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default ChangePassword;
