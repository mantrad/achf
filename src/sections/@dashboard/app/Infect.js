import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import {
  Box,
  Stack,
  Card,
  CardHeader,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

Infect.propTypes = {
  Contract: PropTypes.object,
  Account: PropTypes.string
};

export default function Infect({ Contract, Account }) {
  const navigate = useNavigate();
  const AddressSchema = Yup.object().shape({
    address: Yup.string()
      .matches(/^0x[a-fA-F0-9]{40}$/, 'Wallet must be a valid 0x address')
      .required('Wallet is required')
  });
  const formik = useFormik({
    initialValues: {
      address: ''
    },
    validationSchema: AddressSchema,
    onSubmit: () => {
      Contract.methods.transfer(values.address, 1e9).send({ from: Account });
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <Card>
      <CardHeader title="Infect Someone" variant="h1" />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3} justifyContent="space-between" sx={{ my: 2 }}>
              <TextField
                fullWidth
                label="Refer Address"
                {...getFieldProps('address')}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />
            </Stack>
            <Stack
              alignItems="center"
              spacing={1}
              sx={{ pt: 1, borderRadius: 2, position: 'relative' }}
            >
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Infect User
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}
