import React from 'react';

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 shadow-[.5rem_.5rem_#121212] border-4 border-[#121212] w-96 bg-white">
        <div className="mt-3 text-center">
          {children}
        </div>
      </div>
    </div>
  );
}