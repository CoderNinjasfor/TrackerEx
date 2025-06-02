import { Box, Button, Typography,Paper } from '@mui/material'; // Added Typography

import SummaryCard from '../components/SummaryCard';
import RecentTransactionsList from '../components/RecentTransactionsList';
import useModalStore from '../store/modalStore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// PieChartIcon is no longer needed if the chart always renders or shows "no data"
import { Link } from 'react-router-dom';
import TransactionModal from '../components/TransactionModal';
import ExpensePieChart from '../components/ExpensePieChart'; // <-- IMPORT THE NEW MUI CHART


// Import your useSummaryData hook
import { useSummaryData } from '../hooks/useTransactions'; 

// Placeholder data
// const summaryData = {
//   currentMonthIncome: 2300.00,
//   currentMonthExpenses: 750.50,
//   currentBalance: 1549.50,
// };


const expenseBreakdownData = [
  { name: 'Food', value: 300 },
  { name: 'Transport', value: 150 },
  { name: 'Utilities', value: 100 },
  { name: 'Entertainment', value: 120.50 },
  { name: 'Other', value: 80 },
];

export default function HomePage() {
  const { openModal } = useModalStore();

  // --- Fetch Summary Data ---
  const { data: summaryData, isLoading: isLoadingSummary, isError: isErrorSummary, error: summaryError } = useSummaryData();
  // --- End Fetch Summary Data ---

    // --- Handle Loading and Error States for Summary Data ---
  if (isLoadingSummary) {
    return (
      <Box className="p-2 md:p-4 flex justify-center items-center h-screen">
        <Typography variant="h6">Loading summary data...</Typography>
        {/* You can add a CircularProgress MUI component here too */}
      </Box>
    );
  }
  if (isErrorSummary) {
    return (
      <Box className="p-2 md:p-4 flex justify-center items-center h-screen">
        <Typography variant="h6" color="error">
          Error loading summary data: {summaryError.message}
        </Typography>
      </Box>
    );
  }
  const handleEditTransaction = (transaction) => {
    openModal(transaction);
  };

  return (
    <Box className="p-2 md:p-4"> {/* Use sx prop for MUI Box if preferred: sx={{ p: { xs: 1, md: 2 } }} */}
      <div className="flex justify-end mb-2">
        <button onClick={() => openModal(null)} className="px-4 py-2 bg-blue-500 text-white rounded">Add Transaction</button>
      </div>
      <TransactionModal />
      
      {/* Summary Cards - Using Tailwind grid, can be MUI Grid too */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {/* ... SummaryCard components ... */}
        <div>
          <SummaryCard title="Current Month Income" value={summaryData.currentMonthIncome} icon={<TrendingUpIcon />} color="success.main" />
        </div>
        <div>
          <SummaryCard title="Current Month Expenses" value={summaryData.currentMonthExpenses} icon={<TrendingDownIcon />} color="error.main" />
        </div>
        <div>
          <SummaryCard title="Current Balance" value={summaryData.currentBalance} icon={<AccountBalanceWalletIcon />} color="primary.main" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="col-span-1 lg:col-span-4">
          <RecentTransactionsList onTransactionClick={handleEditTransaction} />
          <div className="text-right mt-2">
            <Button component={Link} to="/transactions" variant="outlined" size="small">
              View All Transactions
            </Button>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3">
          {/* Use Paper or Box for consistent MUI styling if desired */}
       <Paper
  elevation={3}
  sx={{
    p: 2,
    height: 400, // Set a fixed height for the chart area
    display: 'flex',
    flexDirection: 'column',
  }}
>
  <Typography variant="h6" component="h2" gutterBottom>
    Expense Breakdown (Current Month)
  </Typography>
  <Box sx={{ flex: 1, width: '100%', height: 300 }}> {/* Set height here */}
    <ExpensePieChart data={expenseBreakdownData} />
  </Box>
  <div className="text-right mt-4">
    <Button component={Link} to="/reports" variant="outlined" size="small">
      View Full Report
    </Button>
  </div>
</Paper>
        </div>
      </div>
    </Box>
  );
}