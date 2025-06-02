import {
  Box, Button, Typography, CircularProgress, Alert,
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  Paper, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

// Assuming these hooks and store are correctly set up as in previous examples
import { useTransactions, useDeleteTransaction } from '../hooks/useTransactions'; // Make sure this path is correct
import useModalStore from '../store/modalStore'; // Make sure this path is correct

import TransactionModal from '../components/TransactionModal';


export default function TransactionList() {
  const { data: transactions, isLoading, isError, error } = useTransactions();
  const { mutate: deleteTransaction, isLoading: isDeleting } = useDeleteTransaction();
  const { openModal } = useModalStore();

  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenDeleteDialog = (transaction) => {
    setTransactionToDelete(transaction);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setTransactionToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete.id, {
        onSuccess: () => {
          // Optionally, add a success notification (e.g., snackbar)
          console.log("Transaction deleted successfully");
          handleCloseDeleteDialog();
        },
        onError: (deleteError) => {
          // Optionally, add an error notification
          console.error("Error deleting transaction:", deleteError);
          handleCloseDeleteDialog();
        }
      });
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
        <Typography ml={2}>Loading transactions...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading transactions: {error?.message || 'An unknown error occurred.'}
      </Alert>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, m: { xs: 1, md: 2 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2" gutterBottom>
          Transactions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openModal()} // Pass null for new transaction
          className="bg-blue-500 hover:bg-blue-600" // Example Tailwind styling if needed
        >
          Add Transaction
        </Button>
        
                   <TransactionModal/>
      </Box>

      {transactions && transactions.length === 0 ? (
        <Typography variant="subtitle1" color="text.secondary" textAlign="center" py={4}>
          No transactions found. Start by adding one!
        </Typography>
      ) : (
        <List disablePadding>
          {transactions && transactions.map((tx) => (
            <ListItem
              key={tx.id}
              divider
              sx={{
                my: 1,
                borderRadius: 1,
                boxShadow: 1,
                bgcolor: 'background.paper',
                '&:hover': { boxShadow: 3 },
                flexWrap: 'wrap' // Allow wrapping for smaller screens
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="h6" component="span" fontWeight="bold">
                    {tx.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.secondary" display="block">
                      {tx.description}
                      
                    </Typography>
                    <Typography component="span" variant="body2" color="text.primary" display="block" mt={0.5}>
                      Category: {tx.category}
                    </Typography>
                    <Typography component="span" variant="caption" color="text.secondary" display="block" mt={0.5}>
                      {/* Ensure tx.created_at exists and is a valid date string/object */}
                      {tx.created_at ? new Date(tx.created_at).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      }) : 'Date not available'}
                    </Typography>
                  </>
                }
                sx={{ pr: {xs: 0, sm: '96px'} }} // Add padding to prevent overlap with actions on small screens
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'flex-start', sm: 'flex-end' }, // Align actions to the right on sm screens up
                  width: { xs: '100%', sm: 'auto' }, // Full width on xs, auto on sm up
                  mt: { xs: 1, sm: 0 } // Margin top on xs
                }}
              >
                <Typography
                  variant="h6"
                  component="span"
                  fontWeight="medium"
                  color={tx.amount < 0 ? 'error.main' : 'success.main'}
                  sx={{ mr: 2, minWidth: '80px', textAlign: { xs: 'left', sm: 'right' } }}
                >
                  {tx.amount < 0 ? '-' : '+'}₱{Math.abs(tx.amount).toFixed(2)}
                </Typography>
                
                  <Tooltip title="Edit">
                    <IconButton edge="end" aria-label="edit" onClick={() => openModal(tx)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>


               

                  <Tooltip title="Delete">
                    <IconButton edge="end" aria-label="delete" onClick={() => handleOpenDeleteDialog(tx)} color="error" disabled={isDeleting && transactionToDelete?.id === tx.id}>
                      {isDeleting && transactionToDelete?.id === tx.id ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
                    </IconButton>
                  </Tooltip>
        
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the transaction: "{transactionToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={20} color="inherit"/> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}