// import { useTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

import { Box, Button, FormControl, FormHelperText, Grid, InputAdornment, InputLabel } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import DatePickerComponent from 'views/utilities/DatePickerComponent';
import { useContext } from 'react';
import { TransactionContext } from 'context/Transaction';
import { INSTRUMENT_TYPE } from 'config/finance';

export default function FinanceForm({ ...others }) {
  //   const theme = useTheme();
  const { newTransaction, updateTransaction } = useContext(TransactionContext);
  const data = others?.tranId;
  return (
    <Formik
      initialValues={{
        instrumentType: data?.productType || 'loan',
        instrumentName: data?.instrumentName || '',
        transactionDate: data && Object.keys(data).length > 0 ? new Date(data?.transactionDate) : new Date(),
        amount: data?.amount || 0.0,
        no_of_installments: data?.no_of_installments || 0,
        submit: null
      }}
      // enableReinitialize
      validationSchema={Yup.object().shape({
        amount: Yup.number().required('Amount is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          console.log(values);
          data && Object.keys(data).length > 0
            ? updateTransaction(values, data._id, others?.current_month)
            : newTransaction(values, others?.current_month);
          console.log(setErrors, setStatus, setSubmitting);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({ errors, setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid container spacing={2}>
            {/* transaction type */}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth sx={{ my: 1 }} variant="standard">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Instrument Type
                  <Box color={'red'} sx={{ display: 'inline' }}>
                    &nbsp;*
                  </Box>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  value={values.instrumentType}
                  onChange={handleChange}
                  name="instrumentType"
                >
                  {INSTRUMENT_TYPE.map((item) => (
                    <FormControlLabel value={item} key={item} control={<Radio />} label={item?.toUpperCase()} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* instrumentName */}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth sx={{ my: 1 }} variant="standard">
                <TextField
                  id="standard-basic"
                  value={values.beneficiary}
                  name="instrumentName"
                  label="Instrument Name"
                  onChange={handleChange}
                  variant="standard"
                />
              </FormControl>
            </Grid>
            {/* transaction date */}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth sx={{ my: 1 }} variant="standard">
                <DatePickerComponent
                  label="Transaction Date"
                  name="transactionDate"
                  format="dd-MMM-yyyy"
                  value={values.transactionDate}
                  onChange={(e) => setFieldValue('transactionDate', e)}
                />
              </FormControl>
            </Grid>
            {/* amount */}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth sx={{ my: 1 }} variant="standard" error={Boolean(touched.amount && errors.amount)}>
                <InputLabel htmlFor="standard-adornment-amount">
                  Amount
                  <Box color={'red'} sx={{ display: 'inline' }}>
                    &nbsp;*
                  </Box>
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  name="amount"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    // Restrict to only numbers and decimals
                    const value = e.target.value;
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  value={values.amount}
                  startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                  inputProps={{
                    inputMode: 'decimal', // Mobile keyboard for numbers and decimals
                    pattern: '[0-9]*' // Allows only digits (useful for mobile devices)
                  }}
                />
                {touched.amount && errors.amount && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.amount}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* no_of_installments */}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth sx={{ my: 1 }} variant="standard">
                <TextField
                  id="standard-multiline-flexible"
                  type="number"
                  value={values.no_of_installments}
                  name="no_of_installments"
                  onChange={handleChange}
                  label="No of Installments"
                  variant="standard"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                {data && Object.keys(data).length > 0 ? 'Update' : 'Add'}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}
