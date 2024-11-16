import { Button, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { IconTrash } from '@tabler/icons-react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import { TransactionContext } from 'context/Transaction';
import { date } from 'yup';
import NewTransaction from './NewTransaction';
import { CustomHeader } from 'views/utilities/CustomeTableHeader';
import TransactionDeleteDialog from './TransactionDeleteDialog';
import TransactionModal from './TransactionModal';
// ==============================|| EXPENSE ||============================== //

export default function TransactionData({ current_month = false }) {
  const { transactionDetails, fetchTransaction, deleteRestoreTransaction, deleteDialog, setDeleteDialog, totalAmount } =
    useContext(TransactionContext);
  const [tranId, setTransactionId] = useState({});
  const { setDialogOpen } = React.useContext(TransactionContext);

  const summaryObject = {
    balance: totalAmount,
    expense: 1020,
    previousPending: 1030,
    pending: 14030,
    paid: 1030,
    income: 1400,
    emi: 1020,
    investment: 1020
  };

  const onDeleteButton = (row) => {
    console.log(row);
    setDeleteDialog(true);
    setTransactionId(row);
  };

  const rowClick = (params) => {
    setDialogOpen(true);
    setTransactionId(params.row);
  };
  const columns = [
    // { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'transactionType',
      headerName: 'Type',
      width: 120,
      class: 'header',
      renderHeader: CustomHeader,
      valueFormatter: (params) => params?.toUpperCase()
    },
    {
      field: 'transactionDate',
      headerName: 'Date',
      type: date,
      width: 100,
      renderHeader: CustomHeader,

      valueFormatter: (params) => {
        const date = new Date(params); // Create a new Date object from the field value
        return format(date, 'dd-MMM-yyyy'); // Format the date to dd-MM-yyyy
      }
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 120,
      renderHeader: CustomHeader,

      valueFormatter: (params) => params?.toUpperCase()
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 110,
      renderHeader: CustomHeader,
      renderCell: (params) => {
        // Define the style based on the value
        const style = {
          color: params.row.transactionType == 'income' ? 'green' : 'red' // green for positive, red for negative
        };

        return <span style={style}>{params?.value?.toFixed(2)}</span>;
      }
    },
    {
      field: 'beneficiary',
      headerName: 'Beneficiary',
      // sortable: false,
      width: 150,
      renderHeader: CustomHeader,
      valueFormatter: (params) => params?.toUpperCase()

      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
    },
    {
      field: 'description',
      headerName: 'Description',
      // sortable: false,
      width: 300,
      renderHeader: CustomHeader

      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
    },
    {
      field: 'createdAt',
      headerName: 'Creation Date',
      // sortable: false,
      width: 150,
      renderHeader: CustomHeader,
      valueFormatter: (params) => {
        const date = new Date(params); // Create a new Date object from the field value
        return format(date, 'dd-MM-yyyy HH:MM'); // Format the date to dd-MM-yyyy
      }
      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
    },
    {
      field: 'updatedAt',
      headerName: 'Updation Date',
      // sortable: false,
      width: 150,
      renderHeader: CustomHeader,
      valueFormatter: (params) => {
        const date = new Date(params); // Create a new Date object from the field value
        return format(date, 'dd-MM-yyyy HH:MM'); // Format the date to dd-MM-yyyy
      }

      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
    },
    {
      field: 'delete',
      headerName: 'Delete',
      with: 50,
      align: 'center',
      renderHeader: CustomHeader,
      renderCell: (params) => (
        <div>
          <Button>
            <IconTrash stroke={2} onClick={() => onDeleteButton(params.row)} />
          </Button>
        </div>
      )
    }
  ];
  useEffect(() => {
    fetchTransaction(current_month ? `?currentMonth=${true}` : '');
    // fetchTransaction();
  }, [current_month]);

  return (
    <>
      <Breadcrumbs card={true} divider={true} navigation={true} />
      <MainCard
        title={`TRANSACTION DETAILS`}
        secondary={<NewTransaction title="Add Transaction" current_month={current_month} />}
        transaction={true}
        summaryObject={summaryObject}
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
                    updatedAt: false
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

      <TransactionDeleteDialog {...{ deleteDialog, setDeleteDialog, tranId, deleteRestoreTransaction }} />
      <TransactionModal {...{ tranId, current_month }} />
    </>
  );
}
