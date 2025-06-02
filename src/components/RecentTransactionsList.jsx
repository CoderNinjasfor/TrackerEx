import { List, ListItem, ListItemText, Typography, Paper, Divider, CircularProgress, Alert } from '@mui/material';
import PropTypes from 'prop-types';
import { useTransactions } from '../hooks/useTransactions'; // Ensure this path is correct

export default function RecentTransactionsList({ onTransactionClick }) {
  // Destructure isLoading, isError, and error from the hook
  const { data: transactions, isLoading, isError, error } = useTransactions();

  // 1. Handle Loading State
  if (isLoading) {
    return (
      <Paper elevation={3} className="p-4 flex justify-center items-center min-h-[150px]">
        <CircularProgress size={24} />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
          Loading recent transactions...
        </Typography>
      </Paper>
    );
  }

  // 2. Handle Error State
  if (isError) {
    return (
      <Paper elevation={3} className="p-4">
        <Alert severity="error">
          Error loading transactions: {error?.message || 'An unknown error occurred.'}
        </Alert>
      </Paper>
    );
  }

  // 3. Ensure transactions data exists before trying to slice it
  //    React Query usually returns an empty array if the fetch is successful but there's no data.
  //    But an explicit check is safer.
  const displayTransactions = transactions ? transactions.slice(0, 5) : []; 

  return (
    <Paper elevation={3} className="p-4">
      <Typography variant="h6" gutterBottom component="div">
        Recent Transactions
      </Typography>
      {displayTransactions.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No recent transactions.
        </Typography>
      ) : (
        <List disablePadding>
          {displayTransactions.map((transaction, index) => (
            <div key={transaction.id}>
              <ListItem
                button={!!onTransactionClick} // Make it a button only if onTransactionClick is provided
                onClick={() => onTransactionClick && onTransactionClick(transaction)}
                className="hover:bg-gray-100"
              >
                <ListItemText
                  primary={transaction.name}
                  secondary={`${transaction.category} - ${transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : ''}`}
                />
                <Typography
                  variant="body1"
                  color={transaction.amount < 0 ? 'error.main' : 'success.main'}
                  className="font-semibold"
                >
                  {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                </Typography>
              </ListItem>
              {index < displayTransactions.length - 1 && <Divider component="li" />}
            </div>
          ))}
        </List>
      )}
      {/* Optionally, add a "View All" link to the TransactionsPage */}
    </Paper>
  );
}

RecentTransactionsList.propTypes = {
  // 'transactions' is no longer a prop if fetched internally
  onTransactionClick: PropTypes.func,
};