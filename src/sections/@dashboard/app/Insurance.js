// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// utils
import { fShortenNumber, fCurrency } from '../../../utils/formatNumber';
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

Insurance.propTypes = {
  Insurance: PropTypes.number
};
export default function Insurance({ Insurance }) {
  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
        ACH Insurance Fund Value
      </Typography>
      <Typography variant="h3">{fCurrency(Insurance)}</Typography>
    </RootStyle>
  );
}
