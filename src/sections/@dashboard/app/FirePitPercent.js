// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// utils
import { fShortenNumber, fPercent } from '../../../utils/formatNumber';
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

FirePitPercent.propTypes = {
  FirePitPercent: PropTypes.number
};
export default function FirePitPercent({ FirePitPercent }) {
  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
        % FirePit : Supply
      </Typography>
      <Typography variant="h3">{fPercent(FirePitPercent)}</Typography>
    </RootStyle>
  );
}
