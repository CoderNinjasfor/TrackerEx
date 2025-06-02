// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const fetchTransactions = async () => {
  const response = await api.get('/transactions');
  return response.data;
};

export const addTransaction = async (transactionData) => {
  const response = await api.post('/transactions', transactionData);
  return response.data;
};

export const updateTransaction = async ({ id, ...data }) => {
  const response = await api.put(`/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id) => {
  await api.delete(`/transactions/${id}`);
  return id;
};

// ... (existing functions)

export const fetchCategories = async () => {
  const response = await api.get('/transactions/categories'); // Or your actual endpoint
  return response.data;
};

export const fetchSummaryData = async () => {
  const response = await api.get('/transactions/summary'); // Or your actual endpoint
  return response.data;
};