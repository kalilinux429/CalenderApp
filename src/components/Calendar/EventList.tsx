import React from 'react';
import { format } from 'date-fns';
import { Clock, Edit, Calendar } from 'lucide-react';
import { useCalendar } from '../../context/CalendarContext';

const EventList: React.FC = () => {
  const { events, selectedDate, openModal } = useCalendar();

  const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
  const dayEvents = events.filter(event => event.date === selectedDateString);

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          {format(selectedDate, 'MMM d, yyyy')}
        </h3>
      </div>

      {dayEvents.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No events for this day</div>
          <button
            onClick={() => openModal()}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add an event
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {dayEvents.map(event => (
            <div
              key={event.id}
              className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openModal(event)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: event.color }}
                    />
                    <h4 className="font-medium text-gray-800">{event.title}</h4>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs capitalize">
                      {event.category}
                    </span>
                  </div>
                  
                  {event.description && (
                    <p className="text-sm text-gray-600 truncate">{event.description}</p>
                  )}
                </div>
                
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Edit className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;