import { useEffect, useState } from 'react';
import { useAddTransaction, useUpdateTransaction,useCategories } from '../hooks/useTransactions';
import { TextField, Button, Stack, MenuItem, FormControl, InputLabel, Select } from '@mui/material'; 
import useModalStore from '../store/modalStore';
import { toast } from 'react-hot-toast';

// Define your categories here (or import from another file)


export default function TransactionForm() {
  const { selectedTransaction, isOpen, closeModal } = useModalStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    category: '', // Default to empty or a specific default category value
  });
  const { data: availableCategories = [], isLoading: isLoadingCategories } = useCategories();
  // If categories are fetched from an API, you can use the useCategories hook
  // If categories are static, you can define them directly in this file or import them
  const { mutate: addTransaction } = useAddTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();

  useEffect(() => {
    if (selectedTransaction) {
      setFormData({
        name: selectedTransaction.name || '',
        description: selectedTransaction.description || '',
        amount: selectedTransaction.amount ?? '',
        category: selectedTransaction.category || '',
      });
      console.log("data:", selectedTransaction);
    } else {
      setFormData({ name: '', description: '', amount: '', category: '' });
    }
  }, [selectedTransaction, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure category is not empty if it's required
    if (!formData.category) {
        toast.error('Please select a category.');
        return;
    }
    const dataToSend = { ...formData, amount: Number(formData.amount) };
    // Remove id if present (shouldn't be, but for safety)
    const { id, ...fieldsToUpdate } = dataToSend;
    console.log('Updating transaction with:', fieldsToUpdate);

    if (selectedTransaction) {
     updateTransaction({ id: selectedTransaction.id, ...fieldsToUpdate });
    } else {
      addTransaction(
        dataToSend,
        // onSuccess and onError are better handled within the useAddTransaction hook definition
        
      );
    }
    closeModal();
  };

  return (
    <>
      {/* Toaster should ideally be at a higher level in your app (e.g., App.js) */}
      {/* <Toaster /> */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{marginTop: 2}}> {/* Added some top margin for aesthetics */}
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            name="description"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            // required // Description might not always be required
            multiline
            rows={3}
          />

          <TextField
            name="amount"
            label="Amount"
            variant="outlined"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              inputProps: { min: 0, step: '0.01' },
            }}
          />

          {/* Category Dropdown using TextField with select prop */}
          <TextField
            select
            name="category"
            label="Category"
            variant="outlined"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="" disabled>
              <em>Select a category</em>
            </MenuItem>
            {(Array.isArray(availableCategories) ? availableCategories : []).map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Alternative using FormControl and Select - gives more control for styling if needed */}
          {/* <FormControl fullWidth required>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              name="category"
              value={formData.category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                <em>Select a category</em>
              </MenuItem>
              {availableCategories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <Button type="submit" variant="contained" size="large" fullWidth>
            {selectedTransaction ? 'Update' : 'Add'} Transaction
          </Button>
        </Stack>
      </form>
    </>
  );
}