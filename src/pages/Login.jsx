import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import {
  usernameValidator,
  useInputValidation,
  passwordValidator,
} from "../utils/validation";
import { useFileHandler } from "6pp";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loginToggler = () => {
    setIsLogin((prev) => !prev);
  };
  const dispatch = useDispatch();
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const loginHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong"),
        { id: toastId };
    } finally {
      setIsLoading(false);
    }
  };

  const signUpHandler = async (e) => {
    setIsLoading(true);
    const toastId = toast.loading("Signing Up...");
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("password", password.value);
    formData.append("username", username.value);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgb(226 17 229), rgb(243 162 255))",
        textAlign: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                onSubmit={loginHandler}
                style={{ width: "100%", marginTop: "1rem" }}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.onChange}
                  error={!!username.error}
                  helperText={username.error}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.onChange}
                  error={!!password.error}
                  helperText={password.error}
                />
                <Button
                  sx={{
                    marginTop: "0.5rem",
                  }}
                  color="primary"
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Typography textAlign="center" m={"1rem"}>
                  Or
                </Typography>
                <Button
                  sx={{
                    marginTop: "0.5rem",
                  }}
                  variant="contained"
                  fullWidth
                  onClick={loginToggler}
                  disabled={isLoading}
                >
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign Up</Typography>
              <form
                onSubmit={signUpHandler}
                style={{ width: "100%", marginTop: "1rem" }}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{ height: "9rem", width: "9rem", objectFit: "contain" }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "white",
                      backgroundColor: "black",
                      ":hover": { backgroundColor: "blue" },
                    }}
                    component="label"
                  >
                    <>
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                      <CameraAltIcon />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography color="error" variant="caption">
                    {avatar.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.onChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.onChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.onChange}
                  error={!!username.error}
                  helperText={username.error}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.onChange}
                  error={!!password.error}
                  helperText={password.error}
                />
                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  color="primary"
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
                <Typography textAlign="center" m={"0.5rem"}>
                  Or
                </Typography>
                <Button
                  sx={{
                    marginTop: "0.5rem",
                  }}
                  variant="contained"
                  fullWidth
                  onClick={loginToggler}
                  disabled={isLoading}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
