import { create } from 'zustand';

const useModalStore = create((set) => ({
  isModalOpen: false,
  selectedTransaction: null,

  openModal: (transaction = null) =>
    set({ isModalOpen: true, selectedTransaction: transaction }),
  closeModal: () => set({ isModalOpen: false, selectedTransaction: null }),
}));

export default useModalStore;
