import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../features/alertSlice';
import sessionReducer from '../features/sessionSlice';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    alert: alertReducer,
    session: sessionReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
