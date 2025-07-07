import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface ConfirmOptions {
  message: string;
  onConfirm: () => void;
}

interface ConfirmContextType {
  showConfirm: (message: string, onConfirm: () => void) => void;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context)
    throw new Error("useToast must be used within ConfirmModalProvider");
  return context;
}

export default function ConfirmModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const showConfirm = useCallback((message: string, onConfirm: () => void) => {
    {
      setOptions({ message, onConfirm });
    }
  }, []);

  const handleConfirm = () => {
    options?.onConfirm();
    setOptions(null);
  };

  const handleCancel = () => {
    setOptions(null);
  };

  return (
    <ConfirmContext.Provider value={{ showConfirm }}>
      {children}

      {options && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg  w-[300px] md:w-full max-w-[300px] md:max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
            <p className="mb-6">{options.message}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
