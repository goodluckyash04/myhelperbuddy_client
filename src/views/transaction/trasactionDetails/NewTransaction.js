import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
import { ButtonBase, Link, Tooltip } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';

// project imports
import Avatar from '../../../ui-component/extended/Avatar';
import TransactionModal from './TransactionModal';
import { useContext } from 'react';
import { TransactionContext } from 'context/Transaction';

// ==============================|| CARD SECONDARY ACTION ||============================== //

const NewTransaction = ({ title, current_month }) => {
  //   const theme = useTheme();
  const { setDialogOpen } = useContext(TransactionContext);

  const openDialog = () => {
    console.log('hello');
    setDialogOpen(true);
  };
  return (
    <>
      <Tooltip title={title || 'Reference'} placement="left">
        <ButtonBase disableRipple>
          <Avatar component={Link} onClick={openDialog} alt="Add" size="badge" color="primary" outline>
            <IconPlus stroke={2} />
          </Avatar>
        </ButtonBase>
      </Tooltip>
      <TransactionModal current_month={current_month} />
    </>
  );
};

NewTransaction.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  current_month: PropTypes.bool
};

export default NewTransaction;
