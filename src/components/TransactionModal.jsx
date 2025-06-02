import { Modal, Box, Typography } from '@mui/material';
import TransactionForm from './TransactionForm';

import useModalStore from '../store/modalStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function TransactionModal() {
  
const { isModalOpen, closeModal, selectedTransaction } = useModalStore();
  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Box sx={style}>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold bg-transparent border-none cursor-pointer"
          style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
          aria-label="Close"
        >
          &times;
        </button>
        <Typography variant="h6" component="h2" mb={2}>
          {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
        </Typography>
        <TransactionForm />
      </Box>
    </Modal>
  );
}
