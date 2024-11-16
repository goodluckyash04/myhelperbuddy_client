import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from 'date-fns';
import { Typography } from '@mui/material';

export default function TransactionRestoreDialog({ deleteDialog, setDeleteDialog, tranId, deleteRestoreTransaction }) {
  const handleClose = () => {
    setDeleteDialog(false);
  };

  return (
    <React.Fragment>
      <Dialog open={deleteDialog} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h4" sx={{ color: 'green' }}>
            Restore Transaction Alert !!!{' '}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleteDialog &&
              `Are you sure you want to restore the  ${tranId?.category?.toUpperCase()} of ₹ ${tranId?.amount?.toFixed(2)} from ${format(tranId?.transactionDate, 'dd MMM yyyy')}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => deleteRestoreTransaction(tranId._id, true)} autoFocus>
            Restore
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
