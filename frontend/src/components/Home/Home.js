import React, { useEffect, useState } from "react";
import { Container, Divider, Grid, Grow, Paper, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import WagerAmount from "../WagerAmount/WagerAmount";
import Wagering from "../Wagering/Wagering";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HistoryTable from "../HistoryTable/HitstoryTable";
import { useDispatch, useSelector } from "react-redux";
import { wagerRequest } from "../../actions/toss";
import Coin from "../Coin/coin";
import { SETFLIP, TOKENAMOUNT } from "../../constants/actionTypes";
import { recentWagers } from "../../actions/toss";

const Home = () => {
  const dispatch = useDispatch();

  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const result = useSelector((state) => state.wagerReducer.wagerStatus);
  const flip = useSelector((state) => state.wagerReducer.flip);
  const recentWager = useSelector((state) => state.wagerReducer.wagerHistory);

  const isSingedIn = user;
  const [wagerAmount, setWagerAmount] = useState(1);
  const [wagering, setWagering] = useState("heads");
  const setFlip = () => (dispatch({ type: SETFLIP, data: !flip }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(wagerRequest(flip, wagerAmount, wagering))
  }

  useEffect(() => {
    dispatch(recentWagers());
    dispatch({ type: TOKENAMOUNT, data: user.token_amount })
  }, [])

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          {isSingedIn !== "null" && isSingedIn !== null ? (
            <div>
              <Typography variant="h4" align="center" color="primary">
                {`Welcome ${user.name}`}
              </Typography>
              <Divider />
              <Container>
                <Grid container justifyContent={'space-between'} padding={1} spacing={3}>
                  <Grid item xs={12} md={6} lg={6}>
                    <WagerAmount wager={wagerAmount} setWager={setWagerAmount} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Wagering wagering={wagering} setWagering={setWagering} />
                  </Grid>
                </Grid>
                <Grid container justifyContent={'center'} padding={1}>
                  <Coin flip={flip} setFlip={setFlip} result={result} />
                </Grid>
                <Grid container justifyContent={'center'} padding={1}>
                  <Button variant="outlined" fullWidth startIcon={<SendIcon />} onClick={handleSubmit}>
                    Submit
                  </Button>
                </Grid>
                <Grid container justifyContent={'center'} padding={1}>
                  <HistoryTable recentWager={recentWager} />
                </Grid>
              </Container>
            </div>
          ) : (
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          )}
        </Paper>
      </Container>
    </Grow>
  );
};

export default Home;
