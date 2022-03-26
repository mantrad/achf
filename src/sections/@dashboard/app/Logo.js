// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const RootStyle = styled(Box)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  alignItems: 'center'
}));

Logo.propTypes = {
  isReferred: PropTypes.bool
};

export default function Logo({ isReferred }) {
  return (
    <RootStyle>
      {isReferred ? (
        <>
          <Box
            component="img"
            src="./static/illustrations/logo-Achilies.png"
            sx={{ mx: 'auto', height: '260px' }}
          />
          <Typography variant="h3">You are Achilies</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Get infected, buy tokens, and then infect others. May the best superspreader win!
          </Typography>
        </>
      ) : (
        <>
          <Box
            component="img"
            src="./static/illustrations/logo-human.png"
            sx={{ mx: 'auto', height: '260px' }}
          />
          <Typography variant="h3">You are Human</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Get infected, buy tokens, and then infect others. May the best superspreader win!
          </Typography>
        </>
      )}
    </RootStyle>
  );
}
