import PropTypes from 'prop-types';

import { IconSquareRoundedCheck, IconAlertCircle, IconTrash } from '@tabler/icons-react';
import { Button } from '@mui/material';

export const TxnStatusButton = ({ params }) => (
  <Button>
    {params.row.status?.toLowerCase() == 'completed' ? (
      <IconSquareRoundedCheck color={'green'} stroke={2} onClick={() => console.log(params)} />
    ) : (
      <IconAlertCircle color={'#adad1d'} stroke={2} onClick={() => console.log(params)} />
    )}
  </Button>
);

TxnStatusButton.propTypes = {
  params: PropTypes.object
};

export const TxnAmount = ({ params }) => {
  const style = {
    color: params.row.transactionType == 'income' ? 'green' : 'red'
  };
  return <span style={style}>{params?.value?.toFixed(2)}</span>;
};

TxnAmount.propTypes = {
  params: PropTypes.object
};

export const TxnDeleteButton = ({ params, onDeleteButton }) => (
  <Button>
    <IconTrash stroke={2} onClick={() => onDeleteButton(params.row)} />
  </Button>
);

TxnDeleteButton.propTypes = {
  params: PropTypes.object,
  onDeleteButton: PropTypes.func
};
