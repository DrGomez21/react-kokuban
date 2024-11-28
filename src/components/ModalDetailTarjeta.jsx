export function ModalTarjeta({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 content-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative mx-auto mt-4 mb-4 shadow-[.5rem_.5rem_#121212] border-4 border-[#121212] w-3/4 bg-white">
        <div>{children}</div>
      </div>
    </div>
  );
}
