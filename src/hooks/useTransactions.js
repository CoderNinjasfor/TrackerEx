import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// import { fetchTransactions, addTransaction, updateTransaction, deleteTransaction,fetchCategories ,fetchSummaryData} from '../api/api';

import { fetchTransactions, addTransaction, updateTransaction, deleteTransaction ,fetchCategories, fetchSummaryData } from '../axiosCall/api';

export const useTransactions = () => {
  return useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions });
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
       toast.success('Transaction added!');
       queryClient.invalidateQueries({ queryKey: ['transactions'] ,}),
       queryClient.invalidateQueries({ queryKey: ['summary'] ,})
    }
  });
};

// src/hooks/useTransactions.js (or wherever your React Query hooks are)

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTransaction, // Pass the updateTransaction API function directly.
                                 // It already expects an object like { id, ...data }
    onSuccess: () => {

       toast.success('Transaction updated!'),
    
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] ,})
    },
    onError: (error) => {
      console.error("Error in useUpdateTransaction mutationFn:", error);
      // You might want to toast an error here as well, or let the component handle it.
    }
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () =>{
        toast.success('Transaction deleted!'),
      queryClient.invalidateQueries({ queryKey: ['transactions'] })} 
  });
};

export const useCategories = () => {
  return useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
};

export const useSummaryData = () => {
  return useQuery({ queryKey: ['summary'], queryFn: fetchSummaryData });
};