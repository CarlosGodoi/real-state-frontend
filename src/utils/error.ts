import { toast } from 'react-toastify';

export default function informError(message: string) {
  return function (error: Error) {
    window.console.error(error);
    toast.error(message);
  };
}