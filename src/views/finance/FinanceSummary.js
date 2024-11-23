import React from 'react';
import PropTypes from 'prop-types';

import { Card, Divider, Paper, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';

const trxSummarySX = {
  border: '1px solid #cda963',
  boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
  mx: 3
};

export default function FinanceSummary({ summary }) {
  console.log('summary', summary);
  return (
    <Card sx={trxSummarySX}>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          {/* Left side: Expense Section */}
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography align="left">
                  TYPE:
                  <Typography variant="h4" sx={{ display: 'inline' }} color={'#d2b16a'}>
                    {' '}
                    {summary?.type?.toUpperCase()}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align="left">
                  STATUS:{' '}
                  <Typography variant="h4" sx={{ display: 'inline' }} color={'#d2b16a'}>
                    {summary?.status?.toUpperCase()}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align="left">
                  AMOUNT:{' '}
                  <Typography variant="h4" sx={{ display: 'inline' }} color={'#d2b16a'}>
                    ₹ {summary?.totalAmount?.toFixed(2)}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align="left">
                  INSTALLMENTS:{' '}
                  <Typography variant="h4" sx={{ display: 'inline' }} color={'#d2b16a'}>
                    {summary?.installments}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h5">
                  Start Date:{' '}
                  <Box sx={{ display: 'inline' }} color={'#e88d48'}>
                    {summary?.startDate}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">
                  End Date:{' '}
                  <Box sx={{ display: 'inline' }} color={'#e88d48'}>
                    {summary?.endDate}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">
                  Re. Amount:{' '}
                  <Box sx={{ display: 'inline' }} color={'#c92b2b'}>
                    ₹ {summary?.paidAmount?.toFixed(2)}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">
                  Re. Installments:{' '}
                  <Box sx={{ display: 'inline' }} color={'#c92b2b'}>
                    {summary?.remainingInstallments}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Right side: Income Section */}
          {/* <Grid item xs={12} sm={4}>
            <Typography variant="h3" align="left" color={'green'}>
              Income: ₹ {summary?.income?.toFixed(2)}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h5">
                  EMI: <Box color={'brown'}>₹ {summary?.emi?.toFixed(2)}</Box>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">
                  Investment: <Box color={'green'}>₹ {summary?.investment?.toFixed(2)}</Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Paper>
    </Card>
  );
}

FinanceSummary.propTypes = {
  summary: PropTypes.object
};
