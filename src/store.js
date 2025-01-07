import { configureStore} from '@reduxjs/toolkit';
import wrappersReducer from './features/wrappers/actions';
// import appReducer from './features/app/actions';
// import barReducer from './features/bar/actions';
import productReducer from './features/product/actions';
// import loginReducer from './features/login/actions';

export const store = configureStore({
  reducer: {
    wrappers: wrappersReducer,
    // bar: barReducer,
    product: productReducer,
    // login: loginReducer,
    // app: appReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});
