import { useDispatch, useSelector } from 'react-redux';

// Custom typed hooks for Redux
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
