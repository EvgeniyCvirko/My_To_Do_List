import {AppRootStateType, store} from '../app/store';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector