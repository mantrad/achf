import { useState, useEffect, useRef } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Stack, Grid } from '@mui/material';
import PropTypes from 'prop-types';
// utils
import { fCurrency, fNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

// ----------------------------------------------------------------------

Overview.propTypes = {
  Overview: PropTypes.object
};

export default function Overview({ Overview }) {
  const hours = 0;
  const minutes = 0;
  const seconds = 0;
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  const [[h, m, s], setTime] = useState([hours, minutes, seconds]);
  const [status, setStatus] = useState('idle');

  function useInterval(callback, delay) {
    const intervalRef = useRef(null);
    const savedCallback = useRef(callback);
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      const tick = () => savedCallback.current();
      if (typeof delay === 'number') {
        intervalRef.current = window.setInterval(tick, delay);
        return () => window.clearInterval(intervalRef.current);
      }
    }, [delay]);
    return intervalRef;
  }
  const reset = () => {
    setTime([parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10)]);
    setPaused(false);
    setOver(false);
  };
  useEffect(() => {
    if (Overview.countDown) {
      const minutes1 = Math.floor(Overview.countDown / 60);
      const seconds1 = Overview.countDown - minutes1 * 60;
      setTime([parseInt(hours, 10), parseInt(minutes1, 10), parseInt(seconds1, 10)]);
      setStatus('running');
    }
  }, [Overview.countDown, setTime]);

  useInterval(
    () => {
      if (paused || over) {
        return;
      }
      if (h === 0 && m === 0 && s === 0) {
        setOver(true);
      } else if (m === 0 && s === 0) {
        setTime([h - 1, 59, 59]);
      } else if (s === 0) {
        setTime([h, m - 1, 59]);
      } else {
        setTime([h, m, s - 1]);
      }
    },
    status === 'running' ? 1000 : null
  );

  return (
    <RootStyle>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">
            FUSE Price
            <Typography variant="subtitle1">{fCurrency(Overview.tokenPrice)}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">
            Market Cap
            <Typography variant="subtitle1">{fCurrency(Overview.marketCap)}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Typography variant="subtitle1">
            Circulating Supply
            <Typography variant="subtitle1">{fNumber(Overview.circulatingSupply)}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Typography variant="subtitle1">
            Backed Liquidity
            <Typography variant="subtitle1">100%</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Typography variant="subtitle1">
            Next Rebase
            <Typography variant="subtitle1">
              {`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
                .toString()
                .padStart(2, '0')}`}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Typography variant="subtitle1">
            Total Supply
            <Typography variant="subtitle1">{fNumber(Overview.totalSupply)}</Typography>
          </Typography>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
