// material
import { useState, useEffect, useRef } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
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

YourRebase.propTypes = {
  countDown: PropTypes.number
};
export default function YourRebase({ countDown }) {
  const hours = 0;
  const minutes = 0;
  const seconds = 0;
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  const [[h, m, s], setTime] = useState([hours, minutes, seconds]);
  const [status, setStatus] = useState('idle');
  const reset = () => {
    setTime([parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10)]);
    setPaused(false);
    setOver(false);
  };
  useEffect(() => {
    if (countDown) {
      const minutes1 = Math.floor(countDown / 60);
      const seconds1 = countDown - minutes1 * 60;
      setTime([parseInt(hours, 10), parseInt(minutes1, 10), parseInt(seconds1, 10)]);
      setStatus('running');
    }
  }, [countDown, setTime]);

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
  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
        Next Rebase
      </Typography>
      <Typography variant="h3">
        {`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
          .toString()
          .padStart(2, '0')}`}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        You will earn money soon
      </Typography>
    </RootStyle>
  );
}
