import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { IconCurrencyRupee } from '@tabler/icons-react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Typography, Chip } from '@mui/material';
import TransactionSummary from 'views/transaction/trasactionDetails/TransactionSummary';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      transaction = false,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 25,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {title && (
          <CardHeader
            sx={headerSX}
            title={
              darkTitle ? (
                <Typography variant="h3">
                  {title}
                  <Chip color="success" icon={<IconCurrencyRupee />}>
                    300.00
                  </Chip>
                </Typography>
              ) : (
                <Typography variant="h3">
                  {title}&nbsp;
                  {others?.summaryObject?.balance && (
                    <Chip
                      color={others?.summaryObject?.balance > 0 ? 'success' : 'error'}
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                      label={`₹  ${others?.summaryObject?.balance?.toFixed(2)}`}
                      variant="outlined"
                      // icon={<IconCurrencyRupee />}
                    />
                  )}
                </Typography>
              )
            }
            action={secondary}
          />
        )}
        {/* content & header divider */}

        {transaction && <TransactionSummary summaryObject={others?.summaryObject} />}

        {/* card content */}
        {content && (
          <CardContent sx={{ ...contentSX }} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  transaction: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
