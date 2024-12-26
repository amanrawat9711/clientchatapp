import React, { useEffect } from "react";
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
import { useInputValidation } from "../../utils/validation";
import { Navigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { adminLogin, getAdmin } from "../../redux/thunks/admin";


const AdminLogin = () => {
  const {isAdmin} = useSelector((state)=>state.auth)
const dispatch = useDispatch()
  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value))
  };

  useEffect(()=>{
    dispatch(getAdmin())
  },[dispatch])

  if(isAdmin) return <Navigate to={"/admin/dashboard"}/>


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
          <Typography variant="h5">Admin Login</Typography>
          <form
            onSubmit={submitHandler}
            style={{ width: "100%", marginTop: "1rem" }}
          >
            <TextField
              required
              fullWidth
              label="Secrect Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.onChange}
              error={!!secretKey.error}
              helperText={secretKey.error}
            />
            <Button
              sx={{
                marginTop: "0.5rem",
              }}
              color="primary"
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
