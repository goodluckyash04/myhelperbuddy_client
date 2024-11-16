import { Button, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { IconArrowBackUp } from '@tabler/icons-react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import { TransactionContext } from 'context/Transaction';
import { date } from 'yup';
import { CustomHeader } from 'views/utilities/CustomeTableHeader';
import TransactionRestoreDialog from './TransactionRestoreDialog';

// ==============================|| TRANSACTION ||============================== //

export default function DeletedTransaction() {
  const { transactionDetails, fetchTransaction, deleteDialog, setDeleteDialog, deleteRestoreTransaction } = useContext(TransactionContext);
  const [tranId, setTransactionId] = useState({});

  const onRestoreButton = (row) => {
    console.log(row);
    setDeleteDialog(true);
    setTransactionId(row);
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'transactionType',
      headerName: 'TYPE',
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
      headerName: 'beneficiary',
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
      headerName: 'Entry',
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
      headerName: 'Update',
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
      headerName: 'Action',
      with: 50,
      align: 'center',
      renderHeader: CustomHeader,
      renderCell: (params) => (
        <div>
          <Button>
            <IconArrowBackUp stroke={2} onClick={() => onRestoreButton(params.row)} />
          </Button>
        </div>
      )
    }
  ];
  useEffect(() => {
    fetchTransaction(`?transactionStatus=${false}`);
  }, []);

  return (
    <>
      <Breadcrumbs card={true} divider={true} navigation={true} />
      <MainCard title="DELETED TRANSACTION">
        <Grid container spacing={gridSpacing}>
          <Box sx={{ height: '70vh', width: '100%' }}>
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
            />
          </Box>
        </Grid>
      </MainCard>

      <TransactionRestoreDialog {...{ deleteDialog, setDeleteDialog, tranId, deleteRestoreTransaction }} />
    </>
  );
}
