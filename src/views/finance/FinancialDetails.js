import PropTypes from 'prop-types';

// material-ui
import { Grid, Switch } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import NewFinance from './NewFinance';
import ProductCard from './ProductCard';
import { useLocation } from 'react-router';

// ============================|| FINANCE ||============================ //

const FinancialDetails = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const product = query.get('q') || 'Loan';

  return (
    <MainCard title={`FINANCIAL DETAILS`} secondary={<NewFinance title="Add" />}>
      <Grid container>
        <Grid item xs={12}>
          <SubCard
            title={`MY ${product?.toUpperCase()}S`}
            secondary={<Switch defaultChecked onChange={(e) => console.log(e.target.checked)} />}
          >
            <Grid container>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, x) => (
                <Grid key={i + x} item xs={12} sm={6} md={4} lg={3}>
                  <ProductCard />
                </Grid>
              ))}
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

FinancialDetails.propTypes = {
  product: PropTypes.string.isRequired
};

export default FinancialDetails;
