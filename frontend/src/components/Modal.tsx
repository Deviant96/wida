import React, { ReactNode } from 'react';
import { CgClose } from 'react-icons/cg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 text-gray-600 text-3xl hover:text-gray-800"
        >
          <CgClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
