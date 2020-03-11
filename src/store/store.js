import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducer';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
