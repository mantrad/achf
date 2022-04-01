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
import Iconify from '../../../components/Iconify';

YourReflection2.propTypes = {
  AllInRewards: PropTypes.number,
  TotalRewards: PropTypes.string,
  DistributedRewards: PropTypes.number,
  FromLastReward: PropTypes.string,
  RewardPeriod: PropTypes.string,
  Rewardedsofar: PropTypes.number,
  Toberewarded: PropTypes.number
};

export default function YourReflection2({
  AllInRewards,
  TotalRewards,
  DistributedRewards,
  FromLastReward,
  RewardPeriod,
  Rewardedsofar,
  Toberewarded
}) {
  return (
    <Card>
      <CardHeader title="Reflection By METIS" />
      <Scrollbar>
        <Stack spacing={0} sx={{ p: 4, pr: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">All In Rewards</Typography>
            <Typography variant="h6">{fNumber(AllInRewards)} FUSE</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Total Rewards</Typography>
            <Typography variant="h6">{fCurrency(TotalRewards)}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Distributed Rewards</Typography>
            <Typography variant="h6">{fCurrency(DistributedRewards)}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">From Last Reward</Typography>
            <Typography variant="h6">{FromLastReward}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Reward Period</Typography>
            <Typography variant="h6">{RewardPeriod} seconds</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Rewarded so far</Typography>
            <Typography variant="h6">{fCurrency(Rewardedsofar)}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">To be rewarded</Typography>
            <Typography variant="h6">{fCurrency(Toberewarded)}</Typography>
          </Stack>
        </Stack>
      </Scrollbar>
    </Card>
  );
}
