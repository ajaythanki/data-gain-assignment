'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, addHours } from 'date-fns';
import { v4 as uuidv4 } from '@/lib/utils';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  addEvent,
  updateEvent,
  deleteEvent,
  setModalOpen,
  setSelectedEvent,
} from '@/store/features/calendarSlice';
import { CalendarEvent } from '@/lib/types';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  start: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Start date is required',
  }),
  end: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'End date is required',
  }),
  type: z.enum(['event', 'reminder']),
});

type FormValues = z.infer<typeof formSchema>;

const EventModal = () => {
  const dispatch = useAppDispatch();
  const { modalOpen, selectedDate, selectedEvent } = useAppSelector((state) => state.calendar);

  const isEditing = !!selectedEvent;
  const defaultType = selectedEvent?.type || 'event';

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      start: '',
      end: '',
      type: 'event',
    },
  });

  useEffect(() => {
    if (modalOpen) {
      try {
        const now = selectedDate ? new Date(selectedDate) : new Date();
        
        let startTime: Date;
        let endTime: Date;
  
        if (selectedEvent?.start) {
          startTime = new Date(selectedEvent.start);
        } else {
          startTime = now;
        }
  
        if (selectedEvent?.end) {
          endTime = new Date(selectedEvent.end);
        } else {
          endTime = addHours(startTime, 1);
        }
  
        // Validate dates before formatting
        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
          console.error('Invalid date values');
          return;
        }
  
        form.reset({
          title: selectedEvent?.title || '',
          description: selectedEvent?.description || '',
          start: format(startTime, "yyyy-MM-dd'T'HH:mm"),
          end: format(endTime, "yyyy-MM-dd'T'HH:mm"),
          type: defaultType,
        });
      } catch (error) {
        console.error('Error processing dates:', error);
        // Set default values if date processing fails
        const now = new Date();
        form.reset({
          title: selectedEvent?.title || '',
          description: selectedEvent?.description || '',
          start: format(now, "yyyy-MM-dd'T'HH:mm"),
          end: format(addHours(now, 1), "yyyy-MM-dd'T'HH:mm"),
          type: defaultType,
        });
      }
    }
  }, [modalOpen, selectedDate, selectedEvent, form, defaultType]);

  const handleClose = () => {
    form.reset();
    dispatch(setModalOpen(false));
    dispatch(setSelectedEvent(null));
  };

  const onSubmit = (values: FormValues) => {
    const eventData: CalendarEvent = {
      id: selectedEvent?.id || uuidv4(),
      title: values.title,
      description: values.description,
      start: new Date(values.start).toISOString(),
      end: new Date(values.end).toISOString(),
      type: values.type,
      color: values.type === 'event' ? '#2563eb' : '#dc2626', // Blue for events, red for reminders
    };

    if (isEditing) {
      dispatch(updateEvent(eventData));
    } else {
      dispatch(addEvent(eventData));
    }

    handleClose();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      dispatch(deleteEvent(selectedEvent.id));
      handleClose();
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add New'}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={defaultType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="event"
              onClick={() => form.setValue('type', 'event')}
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-950 dark:data-[state=active]:text-blue-300"
            >
              Event
            </TabsTrigger>
            <TabsTrigger
              value="reminder"
              onClick={() => form.setValue('type', 'reminder')}
              className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600 dark:data-[state=active]:bg-red-950 dark:data-[state=active]:text-red-300"
            >
              Reminder
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <TabsContent value="event" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="end"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter event details"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="reminder" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reminder Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter reminder title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date & Time</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="end"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormLabel>End</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter reminder notes"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <DialogFooter className="mt-6 flex items-center justify-between">
                <div>
                  {isEditing && (
                    <Button type="button" variant="destructive" onClick={handleDelete}>
                      Delete
                    </Button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" type="button" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit">{isEditing ? 'Save Changes' : 'Add'}</Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
