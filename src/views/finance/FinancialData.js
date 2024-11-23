/* eslint-disable*/
import { Grid } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { format } from 'date-fns';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import { TransactionContext } from 'context/Transaction';
import { date } from 'yup';
import { CustomHeader } from 'views/utilities/CustomeTableHeader';
// import TransactionDeleteDialog from './TransactionDeleteDialog';
import PropTypes from 'prop-types';
import { TxnAmount, TxnDeleteButton, TxnStatusButton } from 'views/transaction/config/ExtraComponents';
import { useLocation } from 'react-router';
import NewFinance from './NewFinance';
import FinanceModal from './FinanceModal';

// ==============================|| TRANSACTION ||============================== //

export default function FinancialData() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const product_id = query.get('id') || '';
  console.log(product_id);
  const currentMonth = false;
  const { transactionDetails, fetchTransaction, setDeleteDialog, summary } = useContext(TransactionContext);
  // const [tranId, setTransactionId] = useState({});
  const { setDialogOpen } = React.useContext(TransactionContext);

  const onDeleteButton = (row) => {
    console.log(row);
    setDeleteDialog(true);
    // setTransactionId(row);
  };

  const rowClick = (params) => {
    setDialogOpen(true);
    // setTransactionId(params.row);
  };

  const valueFormat = (params, value_type) => {
    switch (value_type) {
      case 'upper':
        return params?.toUpperCase();
      case 'date':
        return format(new Date(params), 'dd MMM yyyy');
      default:
        return params;
    }
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'transactionType',
      headerName: 'Type',
      width: 120,
      renderHeader: CustomHeader,
      valueFormatter: (params) => valueFormat(params, 'upper')
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderHeader: CustomHeader,
      renderCell: (params) => <TxnStatusButton {...{ params }} />
    },
    {
      field: 'transactionDate',
      headerName: 'Date',
      type: date,
      width: 100,
      renderHeader: CustomHeader,
      valueFormatter: (params) => valueFormat(params, 'date')
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 120,
      renderHeader: CustomHeader,
      valueFormatter: (params) => valueFormat(params, 'upper')
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 110,
      renderHeader: CustomHeader,
      renderCell: (params) => <TxnAmount {...{ params }} />
    },
    {
      field: 'beneficiary',
      headerName: 'Beneficiary',
      width: 150,
      renderHeader: CustomHeader,
      valueFormatter: (params) => valueFormat(params, 'upper')
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      renderHeader: CustomHeader
    },
    {
      field: 'createdAt',
      headerName: 'Creation Date',
      width: 150,
      renderHeader: CustomHeader,
      valueFormatter: (params) => valueFormat(params, 'date')
    },
    {
      field: 'updatedAt',
      headerName: 'Updation Date',
      width: 150,
      renderHeader: CustomHeader,
      valueFormatter: (params) => valueFormat(params, 'date')
    },
    {
      field: 'mode',
      headerName: 'Mode',
      width: 150,
      renderHeader: CustomHeader,
      valueFormatter: (params) => valueFormat(params, 'upper')
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 60,
      align: 'center',
      renderHeader: CustomHeader,
      renderCell: (params) => <TxnDeleteButton {...{ params, onDeleteButton }} />
    }
  ];

  const finacialSummary = {
    type: 'loan',
    startDate: '20 Nov 2024',
    endDate: '20 OCT 2025',
    status: 'Active',
    totalAmount: 20000,
    installments: 8,
    remainingInstallments: 2,
    paidAmount: 2000
  };

  useEffect(() => {
    fetchTransaction(currentMonth ? `?currentMonth=${true}` : '');
  }, [currentMonth]);

  return (
    <>
      <Breadcrumbs card={true} divider={true} navigation={true} />
      <MainCard
        title={`INSTRUMENT DETAILS`}
        secondary={<NewFinance title="back" current_month={currentMonth} />}
        transaction={true}
        finacialSummary={finacialSummary}
      >
        <Grid spacing={gridSpacing}>
          <Box sx={{ height: '45vh', width: '100%' }}>
            <DataGrid
              rows={transactionDetails}
              columns={columns}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // Hide columns status and traderName, the other columns will remain visible
                    description: false,
                    createdAt: false,
                    updatedAt: false,
                    mode: false
                  }
                },
                pagination: {
                  paginationModel: {
                    pageSize: 25
                  }
                }
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              density="compact"
              slots={{ toolbar: GridToolbar }}
              checkboxSelection
              disableRowSelectionOnClick
              onRowDoubleClick={rowClick}
            />
          </Box>
        </Grid>
      </MainCard>

      {/* <TransactionDeleteDialog {...{ deleteDialog, setDeleteDialog, tranId, deleteRestoreTransaction }} /> */}
      <FinanceModal {...{ currentMonth }} />
    </>
  );
}

TxnDeleteButton.propTypes = {
  currentMonth: PropTypes.bool
};
