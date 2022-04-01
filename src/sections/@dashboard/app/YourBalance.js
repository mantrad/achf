// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// utils
import { fNumber, fCurrency } from '../../../utils/formatNumber';
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

YourBalance.propTypes = {
  totalBalance: PropTypes.number,
  totalBalanceUSD: PropTypes.number
};
export default function YourBalance({ totalBalance, totalBalanceUSD }) {
  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
        Your Balance
      </Typography>
      <Typography variant="h3">{fCurrency(totalBalanceUSD)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {fNumber(totalBalance)} $FUSE
      </Typography>
    </RootStyle>
  );
}
