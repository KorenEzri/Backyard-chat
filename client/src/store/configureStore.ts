import { userActions, userReducer } from '../app/redux/slices';
import {
  applyMiddleware,
  combineReducers,
  configureStore,
  compose,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import { sagaLoginWithToken } from 'app/redux/slices/userSlice/saga';
import { takeLatest } from 'redux-saga/effects';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  userSlice: userReducer,
  //  anonUserChat: anonUserReducer,
});

const rootSaga = function* () {
  yield takeLatest(userActions.loginWithTokenAction, sagaLoginWithToken);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware: any = [];
const enhancers: any = [];

const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

enhancers.push(applyMiddleware(...middleware));

export const store = configureStore({
  reducer: persistedReducer,
  enhancers: compose(enhancers),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
