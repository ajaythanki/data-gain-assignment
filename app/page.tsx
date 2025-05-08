'use client';

import Layout from '@/components/layout/Layout';
import Calendar from '@/components/calendar/Calendar';

export default function CalendarPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your events and reminders with a calendar view.
          </p>
        </div>

        <Calendar />
      </div>
    </Layout>
  );
}
