import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
import { fNumber, fCurrency } from '../../../utils/formatNumber';
//
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';

YourReflection.propTypes = {
  maxTx: PropTypes.number,
  send: PropTypes.number,
  receive: PropTypes.number
};

export default function YourReflection({ maxTx, send, receive }) {
  return (
    <Card>
      <CardHeader title="Your Reflection" />
      <Scrollbar>
        <Stack spacing={0} sx={{ p: 4, pr: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Max wallet limit</Typography>
            <Typography variant="h6">{fNumber(maxTx)} ACH</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Remaining to receive</Typography>
            <Typography variant="h6">{fNumber(send)} ACH</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Remaining to send</Typography>
            <Typography variant="h6">{fNumber(receive)} ACH</Typography>
          </Stack>
        </Stack>
      </Scrollbar>
    </Card>
  );
}
