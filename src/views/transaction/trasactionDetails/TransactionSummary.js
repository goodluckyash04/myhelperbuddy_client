import React from 'react';
import PropTypes from 'prop-types';

import { Card, Divider, Paper, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';

const trxSummarySX = {
  border: '1px solid #cda963',
  boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
  mx: 3
};

export default function TransactionSummary({ summary }) {
  console.log(summary);
  return (
    <Card sx={trxSummarySX}>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          {/* Left side: Expense Section */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h3" align="left" color={'#c92b2b'}>
              Expense: ₹ {summary?.expense?.toFixed(2)}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">
                  Pre. Pending Expense: <Box color={'red'}>₹ {summary?.previousPending?.toFixed(2)}</Box>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5">
                  Pending Expense:<Box color={'#e88d48'}>₹ {summary?.pending?.toFixed(2)}</Box>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5">
                  Paid Expense: <Box color={'#c92b2b'}>₹ {summary?.paid?.toFixed(2)}</Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Right side: Income Section */}
          <Grid item xs={12} sm={4}>
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
          </Grid>
        </Grid>
      </Paper>
    </Card>
  );
}

TransactionSummary.propTypes = {
  summary: PropTypes.object
};
