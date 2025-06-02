import React from 'react';

import useModalStore from '../store/modalStore';

export default function Modal({ children }) {
  const { isModalOpen, closeModal } = useModalStore();

  

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-5 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
