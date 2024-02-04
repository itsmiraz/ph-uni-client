// ErrorHandler.tsx

import { toast } from "sonner";

// const isErrorObject = (obj: any): obj is ErrorObject => {
//   return obj && (obj.error !== undefined || obj.message !== undefined);
// };

const ErrorHandler = ({ error }: { error?: any }) => {
  let errorMessage = "An error occurred.";

  if (error?.data?.message) {
    errorMessage = error?.data?.message;
  }

  // Show toast with error message
  return <>{toast.error(errorMessage)}</>;
};

export default ErrorHandler;
