import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fCurrency, fNumber, fPercent, fPercentpad1 } from '../../../utils/formatNumber';
//
import Scrollbar from '../../../components/Scrollbar';

YourReflection1.propTypes = {
  tokenPrice: PropTypes.number,
  NextRewardAmount: PropTypes.number,
  NextRewardAmountUSD: PropTypes.number,
  NextRewardYield: PropTypes.number,
  ROI1USD: PropTypes.number,
  ROI5Rate: PropTypes.number,
  ROI5USD: PropTypes.number
};

export default function YourReflection1({
  tokenPrice,
  NextRewardAmount,
  NextRewardYield,
  ROI1USD,
  ROI5Rate,
  ROI5USD
}) {
  return (
    <Card>
      <Scrollbar>
        <Stack spacing={0} sx={{ p: 4, pr: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Current ARES Price</Typography>
            <Typography variant="h6">{fCurrency(tokenPrice)}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Next Reward Amount</Typography>
            <Typography variant="h6">{fNumber(NextRewardAmount)} ACH</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Next Reward Amount USD</Typography>
            <Typography variant="h6">$0.00</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Next Reward Yield</Typography>
            <Typography variant="h6">{fPercentpad1(NextRewardYield)}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">ROI(1-Day Rate) USD</Typography>
            <Typography variant="h6">{fCurrency(ROI1USD)}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">ROI(5-Day Rate)</Typography>
            <Typography variant="h6">{fPercent(ROI5Rate)}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">ROI(5-Day Rate) USD</Typography>
            <Typography variant="h6">{fCurrency(ROI5USD)}</Typography>
          </Stack>
        </Stack>
      </Scrollbar>
    </Card>
  );
}
