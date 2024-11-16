import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TransactionForm from './TransactionForm';
import { Typography } from '@mui/material';
import { TransactionContext } from 'context/Transaction';

export default function TransactionModal({ ...others }) {
  const { dialogOpen, setDialogOpen } = React.useContext(TransactionContext);
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog fullWidth={true} maxWidth={'sm'} open={dialogOpen} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h4" color={(theme) => theme.palette.secondary[200]}>
            {`${others?.tranId && Object.keys(others?.tranId).length > 0 ? 'Update' : 'Add'} Transaction`}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.secondary[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TransactionForm {...{ ...others }} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
