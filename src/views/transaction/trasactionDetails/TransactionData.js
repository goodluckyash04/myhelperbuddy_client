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
import { IconSquareRoundedCheck, IconAlertCircle } from '@tabler/icons-react';

// ==============================|| EXPENSE ||============================== //

export default function TransactionData({ current_month = false }) {
  const { transactionDetails, fetchTransaction, deleteRestoreTransaction, deleteDialog, setDeleteDialog, summary } =
    useContext(TransactionContext);
  const [tranId, setTransactionId] = useState({});
  const { setDialogOpen } = React.useContext(TransactionContext);

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
      field: 'status',
      headerName: 'Status',
      // sortable: false,
      width: 150,
      renderHeader: CustomHeader,
      renderCell: (params) => (
        <div>
          <Button>
            {params.row.status?.toLowerCase() == 'completed' ? (
              <IconSquareRoundedCheck color={'green'} stroke={2} onClick={() => console.log(params)} />
            ) : (
              <IconAlertCircle color={'#adad1d'} stroke={2} onClick={() => console.log(params)} />
            )}
          </Button>
        </div>
      )

      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
    },
    {
      field: 'transactionDate',
      headerName: 'Date',
      type: date,
      width: 100,
      renderHeader: CustomHeader,

      valueFormatter: (params) => {
        const date = new Date(params);
        return format(date, 'dd-MMM-yyyy');
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
        const style = {
          color: params.row.transactionType == 'income' ? 'green' : 'red'
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
        const date = new Date(params);
        return format(date, 'dd-MM-yyyy HH:MM');
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
        const date = new Date(params);
        return format(date, 'dd-MM-yyyy HH:MM');
      }

      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
    },
    {
      field: 'mode',
      headerName: 'Mode',
      // sortable: false,
      width: 150,
      renderHeader: CustomHeader,
      valueFormatter: (params) => params?.toUpperCase()
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
  }, [current_month]);

  return (
    <>
      <Breadcrumbs card={true} divider={true} navigation={true} />
      <MainCard
        title={`TRANSACTION DETAILS`}
        secondary={<NewTransaction title="Add Transaction" current_month={current_month} />}
        transaction={true}
        summary={summary}
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
