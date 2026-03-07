import focusReducer from "./modules/focus";
import userReducer from "./modules/user";
import listReducer from "./modules/list";
import quadrantsReducer from "./modules/quadrants";
import habitReducer from "./modules/habit";
import timelineReducer from "./modules/timeline";
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
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// 持久化配置
const focusPersistConfig = {
  key: "focus",
  storage,
  version: 1,
};

const userPersistConfig = {
  key: "user",
  storage,
  version: 1,
};

const listPersistConfig = {
  key: "list",
  storage,
  version: 1,
};

const quadrantsPersistConfig = {
  key: "quadrants",
  storage,
  version: 1,
};

const habitPersistConfig = {
  key: "habit",
  storage,
  version: 1,
};

const timelinePersistConfig = {
  key: "timeline",
  storage,
  version: 1,
};

const persistedFocusReducer = persistReducer(focusPersistConfig, focusReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedListReducer = persistReducer(listPersistConfig, listReducer);
const persistedQuadrantsReducer = persistReducer(
  quadrantsPersistConfig,
  quadrantsReducer,
);
const persistedHabitReducer = persistReducer(habitPersistConfig, habitReducer);
const persistedTimelineReducer = persistReducer(
  timelinePersistConfig,
  timelineReducer,
); // 新增

const store = configureStore({
  reducer: {
    focus: persistedFocusReducer,
    user: persistedUserReducer,
    list: persistedListReducer,
    quadrants: persistedQuadrantsReducer,
    habit: persistedHabitReducer,
    timeline: persistedTimelineReducer, // 新增
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
