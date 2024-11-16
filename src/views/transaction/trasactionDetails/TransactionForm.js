// material-ui
// import { useTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

import { Box, Button, FormControl, FormHelperText, Grid, InputAdornment, InputLabel } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { CATEGORY, TRANSACTION_TYPE, CATEGORY_INCOME } from 'config/transaction';
import DatePickerComponent from 'views/utilities/DatePickerComponent';
import { useContext } from 'react';
import { TransactionContext } from 'context/Transaction';

export default function TransactionForm({ ...others }) {
  //   const theme = useTheme();
  const { newTransaction, updateTransaction } = useContext(TransactionContext);
  const data = others?.tranId;
  return (
    <Formik
      initialValues={{
        transactionType: data?.transactionType || 'expense',
        category: data?.category || '',
        transactionDate: data && Object.keys(data).length > 0 ? new Date(data?.transactionDate) : new Date(),
        amount: data?.amount || 0.0,
        beneficiary: data?.beneficiary || '',
        description: data?.description || '',
        submit: null
      }}
      // enableReinitialize
      validationSchema={Yup.object().shape({
        amount: Yup.number().required('Amount is required'),
        category: Yup.string().required('Category is required')
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
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth sx={{ my: 1 }} variant="standard">
                <FormLabel id="demo-row-radio-buttons-group-label">Transaction Type</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  value={values.transactionType}
                  onChange={handleChange}
                  name="transactionType"
                >
                  {TRANSACTION_TYPE.map((item) => (
                    <FormControlLabel value={item} key={item} control={<Radio />} label={item?.toUpperCase()} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth sx={{ my: 1 }} variant="standard" error={Boolean(touched.category && errors.category)}>
                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  name="category"
                  id="demo-simple-select-standard"
                  value={values.category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="category"
                >
                  {(values.transactionType == 'income' ? CATEGORY_INCOME : CATEGORY).map((item) => (
                    <MenuItem value={item} key={item}>
                      {item?.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
                {touched.category && errors.category && (
                  <FormHelperText error id="standard-weight-helper-text-identifier-login">
                    {errors.category}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
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
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth sx={{ my: 1 }} variant="standard" error={Boolean(touched.amount && errors.amount)}>
                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  name="amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.amount}
                  startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                />
                {touched.amount && errors.amount && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.amount}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth sx={{ my: 1 }} variant="standard">
                <TextField
                  id="standard-basic"
                  value={values.beneficiary}
                  name="beneficiary"
                  label="Beneficiary"
                  onChange={handleChange}
                  variant="standard"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth sx={{ my: 1 }} variant="standard">
                <TextField
                  id="standard-multiline-flexible"
                  value={values.description}
                  name="description"
                  onChange={handleChange}
                  label="Description"
                  multiline
                  maxRows={4}
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