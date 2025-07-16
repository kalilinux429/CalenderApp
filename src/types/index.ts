
// A single calendar event
export interface Event {
  id: string;                      // Unique ID
  title: string;                   // Event title
  description: string;            // Event description
  date: string;                   // Date (YYYY-MM-DD)
  time: string;                   // Time (HH:mm)
  category: 'meeting' | 'personal' | 'work' | 'other'; // Event category
  color: string;                  // Color for UI
}

// Calendar context structure
export interface CalendarContextType {
  events: Event[];                        // List of events
  selectedDate: Date;                    // Selected day
  currentMonth: Date;                    // Currently viewed month
  isModalOpen: boolean;                  // Modal visibility
  editingEvent: Event | null;            // Event being edited

  addEvent: (event: Omit<Event, 'id'>) => void;             // Add new event
  updateEvent: (id: string, event: Partial<Event>) => void; // Update event
  deleteEvent: (id: string) => void;                        // Delete event

  setSelectedDate: (date: Date) => void;    // Change selected date
  setCurrentMonth: (date: Date) => void;    // Change current month
  openModal: (event?: Event) => void;       // Open modal (add/edit)
  closeModal: () => void;                   // Close modal
}


