// import { format } from 'date-fns';
import { useNavigate } from 'react-router';

// import { query_logs } from '../config/transaction';

const { useState } = require('react');
const { createContext } = require('react');

export const FinanceContext = createContext();

export default function FinanceState({ children }) {
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [summary, setSummary] = useState({});

  const base_url = `${process.env.REACT_APP_SERVER_URL}/transaction`;
  const generateQuery = (queryParams) => `?${new URLSearchParams(queryParams).toString()}`;

  const navigate = useNavigate();

  const fetchTransaction = async (queryParams = {}) => {
    let headersList = {
      Authorization: localStorage.getItem('token')
    };
    const url = base_url + generateQuery(queryParams);
    let response = await fetch(url, {
      method: 'GET',
      headers: headersList
    });

    let data = await response.json();

    if (response.ok) {
      setTransactionDetails(data?.transactions.map((item, index) => ({ ...item, id: index + 1 })));
      setSummary(data?.summary);
    } else if (response.status == 401) {
      navigate('/login');
    }
  };

  const newTransaction = async (request_body, current_month) => {
    let headersList = {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json'
    };

    let response = await fetch(base_url, {
      method: 'POST',
      headers: headersList,
      body: JSON.stringify(request_body)
    });

    // let data = await response.json();
    if (response.ok) {
      setDialogOpen(false);
      fetchTransaction(current_month ? { currentMonth: true } : {});
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
    const url = base_url + generateQuery({ id: id });
    let response = await fetch(url, {
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
    const url = base_url + generateQuery({ id: id, transactionStatus: status });
    let response = await fetch(url, {
      method: 'DELETE',
      headers: headersList
    });

    // let data = await response.json();
    if (response.ok) {
      setDeleteDialog(false);
      fetchTransaction(status ? { transactionStatus: false } : {});
    } else if (response.status == 401) {
      navigate('/login');
    }
    return false;
  };
  return (
    <FinanceContext.Provider
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
        summary
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
