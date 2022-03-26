// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// utils
import { fPercent, fPercentpad } from '../../../utils/formatNumber';
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

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

YourAPY.propTypes = {
  totalAPY: PropTypes.number,
  dailyAPY: PropTypes.number
};

export default function YourAPY({ totalAPY, dailyAPY }) {
  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
        APY
      </Typography>
      <Typography variant="h3">{fPercent(totalAPY)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Daily ROI {fPercentpad(dailyAPY)}
      </Typography>
    </RootStyle>
  );
}
