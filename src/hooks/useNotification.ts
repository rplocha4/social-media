import { useDispatch } from 'react-redux';
import { hideNotification, showNotification } from '../store/uiSlice';

function useNotification() {
  const dispatch = useDispatch();

  const displayNotification = (message: string) => {
    dispatch(showNotification({ message }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
  };
  return { displayNotification };
}

export default useNotification;
