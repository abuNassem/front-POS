import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
// تأكد أنك تصدر السلايس بـ export default cartSlice.reducer
import cartReducer from "./feature/counter";

// 1. تجميع الـ Reducers
const rootReducer = combineReducers({
    cart: cartReducer, // تأكد أن cartReducer ليس undefined
});

// 2. إعدادات الـ Persist
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. إنشاء الـ Store مع معالجة خطأ الـ Serializable
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // هذا السطر يحل مشكلة الـ Non-serializable value detected
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;