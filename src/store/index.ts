// store/index.ts
import focusReducer from "./modules/focus";
import { configureStore } from "@reduxjs/toolkit";
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 持久化配置 - 只针对 focus reducer
const focusPersistConfig = {
  key: 'focus',
  storage,
  version: 1
};

// 先对 focusReducer 进行持久化包装
const persistedFocusReducer = persistReducer(focusPersistConfig, focusReducer);

const store = configureStore({
  reducer: {
    focus: persistedFocusReducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;