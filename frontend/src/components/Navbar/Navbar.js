import React, { useState, useEffect } from "react";
import { Box, AppBar, Typography, Button, useMediaQuery } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import * as actionType from "../../constants/actionTypes";
import { styles } from "./styles";
import AccountMenu from "../AccountMenu/AccountMenu";
import { useCallback } from "react";

const Navbar = () => {
  const [user, setUser] = useState(
    localStorage.getItem("profile")
      ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
      : "null"
  );
  const token_amount = useSelector((state) => state.wagerReducer.tokenAmount);

  const dispatch = useDispatch();
  let location = useLocation();
  const history = useNavigate();

  const logout = useCallback(() => {
    dispatch({ type: actionType.LOGOUT });
    history("/auth");
    setUser("null");
  }, [dispatch, history]);

  useEffect(() => {
    if (user !== "null" && user !== null) {
      if (user.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(
      localStorage.getItem("profile")
        ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
        : "null"
    );
  }, [location]);

  const isBigScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div sx={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          sx={styles.heading}
          variant="h5"
          align="center"
        >
          CoinToss
        </Typography>
      </div>
      {user !== "null" && user !== null ? (
        <Box sx={{ ...styles.profile, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          {isBigScreen ? (
            <Typography
              variant="h6"
              align="center"
              sx={styles.token_amount}
            >
              Token Amount : {token_amount}
            </Typography>
          ) : (<></>)}
          <AccountMenu user_data={user} setUser={setUser} />
        </Box>
      ) : (
        <Button
          component={Link}
          to="/auth"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      )}
    </AppBar>
  );
};

export default Navbar;
