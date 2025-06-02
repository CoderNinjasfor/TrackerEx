import { useTransactions, useDeleteTransaction } from '../hooks/useTransactions';
import useModalStore from '../store/modalStore';

// Defines a React functional component to display a list of transactions.
export default function SampleTansList() {
  // Fetches transaction data, loading state, and error state using a custom hook.
  const { data: transactions, isLoading, isError, error } = useTransactions();
  // Fetches the mutation function for deleting a transaction using a custom hook.
  const { mutate: deleteTransaction } = useDeleteTransaction();
  
  // Fetches the function to open a modal (likely for adding/editing transactions) from a custom store.
  const { openModal } = useModalStore();

  // Displays a loading message while transaction data is being fetched.
  if (isLoading) return <p>Loading...</p>;
  // Displays an error message if there was an issue fetching transaction data.
  if (isError) return <p>Error: {error.message}</p>;

  // Renders the main content of the transaction list.
  return (
    // Main container div with vertical spacing between child elements.
    <div className="space-y-4">
      {/* Button to trigger opening the modal for adding a new transaction. */}
      <button 
        onClick={() => openModal()} // When clicked, calls openModal (presumably without arguments for a new transaction).
        className="px-4 py-2 bg-blue-500 text-white rounded" // Tailwind CSS classes for styling.
      >
        Add Transaction
      </button>
      
      {/* Conditional rendering based on whether there are any transactions. */}
      {transactions.length === 0 ? (
        // Displays a message if no transactions are found.
        <p>No transactions found.</p>
      ) : (
        // Renders an unordered list if there are transactions.
        <ul className="space-y-2"> {/* Tailwind CSS for vertical spacing between list items. */}
          {/* Maps over the transactions array to render each transaction as a list item. */}
          {transactions.map((tx) => (
            // Each list item, uniquely keyed by transaction ID.
            <li 
              key={tx.id} 
              className="border p-4 rounded shadow flex justify-between items-center" // Tailwind CSS for styling list items.
            >
              {/* Container for the transaction details. */}
              <div>
                <p className="font-bold">{tx.name}</p> {/* Displays transaction name in bold. */}
                <p>{tx.description}</p> {/* Displays transaction description. */}
                {/* Displays transaction amount and category. Assumes '₱' is the currency symbol. */}
                <p>₱{tx.amount} — {tx.category}</p> 
                {/* Displays the transaction creation date, formatted to a local string. */}
                <p className="text-sm text-gray-500">{new Date(tx.created_at).toLocaleString()}</p>
              </div>
              
              {/* Container for action buttons (Edit, Delete) with horizontal spacing. */}
              <div className="space-x-2">
                {/* Button to trigger opening the modal for editing the current transaction. */}
                <button 
                  onClick={() => openModal(tx)} // Passes the current transaction object to openModal for editing.
                  className="px-2 py-1 bg-yellow-400 text-white rounded" // Tailwind CSS for styling.
                >
                  Edit
                </button>
                {/* Button to trigger the deletion of the current transaction. */}
                <button 
                  onClick={() => deleteTransaction(tx.id)} // Calls deleteTransaction with the ID of the current transaction.
                  className="px-2 py-1 bg-red-500 text-white rounded" // Tailwind CSS for styling.
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}