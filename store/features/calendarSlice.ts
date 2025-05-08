import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarEvent } from '@/lib/types';
import { addDays, subDays } from 'date-fns';

// Mock data for calendar events
const generateMockEvents = (): CalendarEvent[] => {
  const today = new Date();
  const events: CalendarEvent[] = [];

  // Create some sample events
  events.push({
    id: '1',
    title: 'Team Meeting',
    start: addDays(today, 1).toISOString(),
    end: addDays(today, 1).toISOString(),
    type: 'event',
    color: '#2563eb', // blue
    description: 'Weekly team sync-up meeting',
  });

  events.push({
    id: '2',
    title: 'Project Deadline',
    start: addDays(today, 3).toISOString(),
    end: addDays(today, 3).toISOString(),
    type: 'reminder',
    color: '#dc2626', // red
    description: 'Submit final project deliverables',
  });

  events.push({
    id: '3',
    title: 'Client Presentation',
    start: addDays(today, 5).toISOString(),
    end: addDays(today, 5).toISOString(),
    type: 'event',
    color: '#2563eb', // blue
    description: 'Present quarterly results to client',
  });

  events.push({
    id: '4',
    title: 'Follow up with Marketing',
    start: subDays(today, 2).toISOString(),
    end: subDays(today, 2).toISOString(),
    type: 'reminder',
    color: '#dc2626', // red
    description: 'Discuss campaign metrics',
  });

  return events;
};

interface CalendarState {
  events: CalendarEvent[];
  selectedDate: string | null;
  modalOpen: boolean;
  selectedEvent: CalendarEvent | null;
}

const initialState: CalendarState = {
  events: generateMockEvents(),
  selectedDate: null,
  modalOpen: false,
  selectedEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
    setSelectedDate: (state, action: PayloadAction<Date | null>) => {
      state.selectedDate = action.payload?.toISOString() || null;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
      if (!action.payload) {
        state.selectedEvent = null;
      }
    },
    setSelectedEvent: (state, action: PayloadAction<CalendarEvent | null>) => {
      state.selectedEvent = action.payload;
    },
  },
});

export const {
  addEvent,
  updateEvent,
  deleteEvent,
  setSelectedDate,
  setModalOpen,
  setSelectedEvent,
} = calendarSlice.actions;

export default calendarSlice.reducer;
