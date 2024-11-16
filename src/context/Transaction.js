// import { format } from 'date-fns';
import { useNavigate } from 'react-router';

const { useState } = require('react');
const { createContext } = require('react');

export const TransactionContext = createContext();

export default function TransactionState({ children }) {
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [totalAmount, setTotalAmount] = useState(false);

  // const convertDateToStringIST = (now) => {
  //   const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
  //   const istDate = new Date(now.getTime() + istOffset);

  //   // Format as ISO 8601 with +05:30
  //   const istISOString = istDate.toISOString().replace('Z', '+05:30');
  //   return istISOString;
  // };

  const navigate = useNavigate();
  const fetchTransaction = async (queryParams = '') => {
    let headersList = {
      Authorization: localStorage.getItem('token')
    };

    let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/goex/transaction${queryParams}`, {
      method: 'GET',
      headers: headersList
    });

    let data = await response.json();
    console.log(response);
    console.log(data);
    if (response.ok) {
      setTransactionDetails(data.map((item, index) => ({ ...item, id: index + 1 })));
      setTotalAmount(data.reduce((init, item) => (item.transactionType == 'income' ? (init += item.amount) : (init -= item.amount)), 0));
    } else if (response.status == 401) {
      navigate('/login');
    }
  };

  const newTransaction = async (request_body, current_month) => {
    // const body = { ...request_body, transactionDate: convertDateToStringIST(request_body?.transactionDate) };
    let headersList = {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json'
    };

    let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/goex/transaction`, {
      method: 'POST',
      headers: headersList,
      body: JSON.stringify(request_body)
    });

    // let data = await response.json();
    if (response.ok) {
      setDialogOpen(false);
      fetchTransaction(current_month ? `?currentMonth=${true}` : '');
    } else if (response.status == 401) {
      navigate('/login');
    }
  };
  const updateTransaction = async (request_body, id, current_month) => {
    console.log('current_month', current_month);
    let headersList = {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json'
    };

    let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/goex/transaction?id=${id}`, {
      method: 'PUT',
      headers: headersList,
      body: JSON.stringify(request_body)
    });

    // let data = await response.json();
    if (response.ok) {
      setDialogOpen(false);
      fetchTransaction(current_month ? `?currentMonth=${true}` : '');
    } else if (response.status == 401) {
      navigate('/login');
    }
    return false;
  };

  const deleteRestoreTransaction = async (id, status = false) => {
    let headersList = {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json'
    };

    let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/goex/transaction?id=${id}&transactionStatus=${status}`, {
      method: 'DELETE',
      headers: headersList
    });

    // let data = await response.json();
    if (response.ok) {
      setDeleteDialog(false);
      fetchTransaction(status ? `?transactionStatus=${false}` : '');
    } else if (response.status == 401) {
      navigate('/login');
    }
    return false;
  };
  return (
    <TransactionContext.Provider
      value={{
        dialogOpen,
        setDialogOpen,
        fetchTransaction,
        transactionDetails,
        newTransaction,
        deleteRestoreTransaction,
        deleteDialog,
        setDeleteDialog,
        updateTransaction,
        totalAmount
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
