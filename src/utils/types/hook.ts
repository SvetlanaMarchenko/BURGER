import { useDispatch as reduxUseDispatch, useSelector as reduxUseSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '.';


export const useAppDispatch = () => reduxUseDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;
