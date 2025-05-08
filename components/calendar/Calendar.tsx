'use client';

import { useState, useCallback, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSelectedDate, setModalOpen, setSelectedEvent } from '@/store/features/calendarSlice';
import { CalendarEvent } from '@/lib/types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from '@/components/calendar/EventModal';

const locales = {
  'en-US': enUS,
};
type ProcessedEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'event' | 'reminder';
  color?: string;
  description?: string;
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const CalendarComponent = () => {
  const dispatch = useAppDispatch();
  const { events, modalOpen } = useAppSelector((state) => state.calendar);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const eventStyleGetter = useCallback((event: ProcessedEvent) => {
    const backgroundColor = event.color || (event.type === 'event' ? '#2563eb' : '#dc2626');

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        color: 'white',
        border: 'none',
        display: 'block',
      },
    };
  }, []);

  const handleSelectSlot = useCallback(
    ({ start }: { start: Date }) => {
      dispatch(setSelectedDate(start));
      dispatch(setSelectedEvent(null));
      dispatch(setModalOpen(true));
    },
    [dispatch]
  );

  const handleSelectEvent = useCallback(
    ({ start }: { start: Date }) => {
      dispatch(setSelectedDate(start));
      dispatch(setSelectedEvent(null));
      dispatch(setModalOpen(true));
    },
    [dispatch]
  );

  if (!mounted) {
    return <div className="h-[600px] animate-pulse bg-muted/50 rounded-md"></div>;
  }

  const processedEvents = events.map((event: CalendarEvent) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <div className="calendar-container h-[600px]">
      <BigCalendar
        localizer={localizer}
        events={processedEvents}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        className="rounded-md border bg-background p-2 shadow-sm"
      />
      {modalOpen && <EventModal />}

      <style jsx global>{`
        .rbc-toolbar {
          padding: 0.5rem;
          margin-bottom: 1rem;
          background-color: hsl(var(--secondary));
          border-radius: 0.5rem;
        }

        .rbc-toolbar button {
          border-radius: 0.25rem;
        }

        .rbc-toolbar button.rbc-active {
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }

        .rbc-event {
          padding: 0.25rem 0.5rem;
        }

        .rbc-day-bg.rbc-today {
          background-color: hsl(var(--accent) / 0.3);
        }

        .rbc-off-range-bg {
          background-color: hsl(var(--muted) / 0.5);
        }
      `}</style>
    </div>
  );
};

export default CalendarComponent;