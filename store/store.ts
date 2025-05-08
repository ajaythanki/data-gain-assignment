import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import sidebarReducer from './features/sidebarSlice';
import tableReducer from './features/tableSlice';
import calendarReducer from './features/calendarSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['sidebar', 'table', 'calendar'],
  transforms: [
    {
      in: (state: any) => {
        if (state?.calendar) {
          return {
            ...state,
            calendar: {
              ...state.calendar,
              events:
                state.calendar.events?.map((event: any) => ({
                  ...event,
                  start: event.start instanceof Date ? event.start.toISOString() : event.start,
                  end: event.end instanceof Date ? event.end.toISOString() : event.end,
                })) || [],
              selectedDate:
                state.calendar.selectedDate instanceof Date
                  ? state.calendar.selectedDate.toISOString()
                  : state.calendar.selectedDate || null,
              selectedEvent: state.calendar.selectedEvent
                ? {
                    ...state.calendar.selectedEvent,
                    start:
                      state.calendar.selectedEvent.start instanceof Date
                        ? state.calendar.selectedEvent.start.toISOString()
                        : state.calendar.selectedEvent.start,
                    end:
                      state.calendar.selectedEvent.end instanceof Date
                        ? state.calendar.selectedEvent.end.toISOString()
                        : state.calendar.selectedEvent.end,
                  }
                : null,
            },
          };
        }
        return state;
      },
      out: (state: any) => {
        if (state?.calendar) {
          return {
            ...state,
            calendar: {
              ...state.calendar,
              events:
                state.calendar.events?.map((event: any) => ({
                  ...event,
                  start: typeof event.start === 'string' ? new Date(event.start) : event.start,
                  end: typeof event.end === 'string' ? new Date(event.end) : event.end,
                })) || [],
              selectedDate:
                typeof state.calendar.selectedDate === 'string'
                  ? new Date(state.calendar.selectedDate)
                  : state.calendar.selectedDate,
              selectedEvent: state.calendar.selectedEvent
                ? {
                    ...state.calendar.selectedEvent,
                    start:
                      typeof state.calendar.selectedEvent.start === 'string'
                        ? new Date(state.calendar.selectedEvent.start)
                        : state.calendar.selectedEvent.start,
                    end:
                      typeof state.calendar.selectedEvent.end === 'string'
                        ? new Date(state.calendar.selectedEvent.end)
                        : state.calendar.selectedEvent.end,
                  }
                : null,
            },
          };
        }
        return state;
      },
    },
  ],
};

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  table: tableReducer,
  calendar: calendarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
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
