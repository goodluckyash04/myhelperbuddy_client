import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
import { ButtonBase, Link, Tooltip } from '@mui/material';
import { IconPlus, IconArrowNarrowLeft } from '@tabler/icons-react';

// project imports
import Avatar from '../../ui-component/extended/Avatar';
import { useContext } from 'react';
import FinanceModal from './FinanceModal';
import { FinanceContext } from 'context/Finance';
import { useNavigate } from 'react-router';

// ==============================|| CARD SECONDARY ACTION ||============================== //

const NewFinance = ({ title }) => {
  const navigate = useNavigate();
  const { setDialogOpen } = useContext(FinanceContext);

  const openDialog = () => {
    console.log('hello');
    setDialogOpen(true);
  };

  return (
    <>
      {title == 'Add' ? (
        <Tooltip title={title || 'Add'} placement="left">
          <ButtonBase disableRipple>
            <Avatar
              component={Link}
              onClick={openDialog}
              alt="Add"
              size="small" // Adjust size if needed
              sx={{ border: '2px solid' }} // Add border styling (optional)
            >
              <IconPlus stroke={2} />
            </Avatar>
          </ButtonBase>
        </Tooltip>
      ) : (
        <Tooltip title={title || 'Back'} placement="left">
          <ButtonBase disableRipple>
            <Avatar
              component={Link}
              onClick={() => navigate(-1)}
              alt="Back"
              size="small" // Adjust size if needed
              sx={{ border: '2px solid' }} // Add border styling (optional)
            >
              <IconArrowNarrowLeft stroke={2} />
            </Avatar>
          </ButtonBase>
        </Tooltip>
      )}
      <FinanceModal />
    </>
  );
};

NewFinance.propTypes = {
  title: PropTypes.string
};

export default NewFinance;
