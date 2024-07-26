import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Input from "../Login/Input";
import { styles } from "./styles";
import LockIcon from "@mui/icons-material/LockRounded";
import { changePassword } from "../../actions/login";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const PasswordSetting = () => {
  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const isSingedIn = user;
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [changeFormData, setChangeFormData] = useState({
    oldPassword: "",
    newPassword: "",
    email: user.email,
  });
  const dispatch = useDispatch();

  const handleChangeC = (e) => {
    setChangeFormData({ ...changeFormData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = (e) => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const handleSubmitChange = (e) => {
    e.preventDefault();
    dispatch(changePassword(changeFormData, history));
  };

  useEffect(() => {
    if (isSingedIn === "null" || isSingedIn === null) {
      history("/");
    }
  }, []);

  if (isSingedIn !== "null" && isSingedIn !== null) {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <Paper sx={styles.paper} elevation={3}>
            <Avatar sx={styles.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="h5" color="primary">
              Set Password
            </Typography>
            <form sx={styles.form} onSubmit={handleSubmitChange}>
              <Grid container spacing={2}>
                <Typography
                  variant="caption"
                  color="error"
                  sx={styles.typo}
                  align="left"
                >
                  To change your password, enter your current password and your new password.
                </Typography>
                <Input
                  name="oldPassword"
                  label="Current Password"
                  handleChange={handleChangeC}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
                <Input
                  name="newPassword"
                  label="New Password"
                  handleChange={handleChangeC}
                  type="password"
                  showBar={true}
                  passValue={changeFormData.newPassword}
                />
                <Button
                  type="submit"
                  sx={styles.submit}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Change Password
                </Button>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
    );
  } else {
    return <>No Access</>;
  }
};

export default PasswordSetting;
