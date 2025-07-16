/*
  CalendarContext.tsx
 
 This file sets up a global context for managing a calendar application's state,
 including event CRUD operations, selected dates, modal state, and month navigation.
 
 Components wrapped in `CalendarProvider` can access and update calendar data via the `useCalendar` hook.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event, CalendarContextType } from '../types';

// Create the context with type safety
const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

//  Dummy initial data for demonstration (would be replaced with backend data in production)
const dummyEvents: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly team standup meeting',
    date: '2025-07-20',
    time: '09:00',
    category: 'meeting',
    color: '#3B82F6'
  },
  {
    id: '2',
    title: 'Project Deadline',
    description: 'Submit final project deliverables',
    date: '2025-07-1',
    time: '17:00',
    category: 'work',
    color: '#EF4444'
  },
  {
    id: '3',
    title: 'Doctor Appointment',
    description: 'Annual checkup with Dr. Smith',
    date: '2025-07-25',
    time: '14:30',
    category: 'personal',
    color: '#10B981'
  },
  {
    id: '4',
    title: 'Lunch with Sarah',
    description: 'Catch up over lunch at the new restaurant',
    date: '2025-01-22',
    time: '12:00',
    category: 'personal',
    color: '#F59E0B'
  },
  {
    id: '5',
    title: 'Code Review',
    description: 'Review pull requests and provide feedback',
    date: '2025-07-25',
    time: '15:00',
    category: 'work',
    color: '#8B5CF6'
  },
  {
    id: '6',
    title: 'Interview Infosys',
    description: 'React Coding round',
    date: '2025-07-10',
    time: '15:00',
    category: 'work',
    color: '#8B5CF6'
  }
];

// 🌐 Context Provider to wrap around the app or component tree
export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(dummyEvents);           // All calendar events
  const [selectedDate, setSelectedDate] = useState(new Date());         // Currently selected day
  const [currentMonth, setCurrentMonth] = useState(new Date());         // Currently viewed month
  const [isModalOpen, setIsModalOpen] = useState(false);                // Modal visibility
  const [editingEvent, setEditingEvent] = useState<Event | null>(null); // The event being edited

  /*
    Adds a new event to the calendar.
    @param eventData - Event data without the ID (generated automatically)
   */
  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString() // Generate a simple unique ID
    };
    setEvents(prev => [...prev, newEvent]);
  };

  /**
   Updates an existing event based on ID.
     @param id - Event ID
    @param updatedData - Partial fields to update
   */
  const updateEvent = (id: string, updatedData: Partial<Event>) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === id ? { ...event, ...updatedData } : event
      )
    );
  };

  /*
    Deletes an event by its ID.
    @param id - Event ID to remove
   */
  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  /*
    Opens the modal (optionally with an event for editing).
    @param event - Optional existing event to edit
   */
  const openModal = (event?: Event) => {
    setEditingEvent(event || null);
    setIsModalOpen(true);
  };

  // Closes the event modal and resets editing state */
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  // Value object passed to context consumers
  const value: CalendarContextType = {
    events,
    selectedDate,
    currentMonth,
    isModalOpen,
    editingEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    setSelectedDate,
    setCurrentMonth,
    openModal,
    closeModal
  };

  // Provide the context to all children components
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

/*
  Custom hook to access CalendarContext
 @throws Error if used outside the CalendarProvider
 */
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
