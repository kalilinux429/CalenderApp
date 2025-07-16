import React, { useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
} from "date-fns";
import { useCalendar } from "../../context/CalendarContext";
import { Event } from "../../types";

const CalendarGrid: React.FC = () => {
  const { events, selectedDate, currentMonth, setSelectedDate } = useCalendar();

  // Memoize calendar days for performance
  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });
  }, [currentMonth]);

  // Optional: Group events by date string for fast lookup
  const eventsByDate = useMemo(() => {
    const map: Record<string, Event[]> = {};
    for (const event of events) {
      if (!map[event.date]) map[event.date] = [];
      map[event.date].push(event);
    }
    return map;
  }, [events]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const today = new Date();
  const currentWeekdayIndex = today.getDay(); // 0 = Sunday

  return (
    <div className="grid grid-cols-7 gap-1 p-4" role="grid">
      {/* Weekday headers */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => {
        const isCurrentWeekday = index === currentWeekdayIndex;
        return (
          <div
            key={day}
            className={`p-2 text-center font-semibold text-sm border-b-2 ${
              isCurrentWeekday
                ? "text-red-600 border-red-600"
                : "text-gray-600 border-transparent"
            }`}
          >
            {day}
          </div>
        );
      })}

      {/* Calendar days */}
      {days.map((day) => {
        const dateKey = format(day, "yyyy-MM-dd");
        const dayEvents = eventsByDate[dateKey] || [];

        const isSelected = isSameDay(day, selectedDate);
        const isCurrentDay = isToday(day);
        const isCurrentMonth = isSameMonth(day, currentMonth);

        const cellClasses = `
          min-h-[100px] p-2 border border-gray-200 cursor-pointer transition-all duration-200 rounded-md
          ${
            isCurrentMonth
              ? "bg-white hover:bg-blue-50 hover:shadow-md hover:scale-[1.02]"
              : "bg-gray-50 text-gray-400"
          }
          ${isSelected ? "ring-2 ring-blue-500 bg-blue-100" : ""}
          ${!isSelected && isCurrentDay ? "bg-blue-50 font-semibold" : ""}
        `;

        return (
          /*
    Each `day` cell in the calendar grid.
   `dateKey` is a unique string (likely generated using day.toISOString()).
    This ensures React re-renders cells efficiently.
   */
         <div
    key={dateKey}
    onClick={() => handleDateClick(day)}              // Handles day cell click
    className={cellClasses}                     
    role="gridcell"                    
    aria-selected={isSelected}           // Indicates if the day is selected
     tabIndex={0}                        // Makes cell focusable for keyboard navigation
  >
            <div className="flex flex-col h-full">
              <span
                className={`text-sm ${isCurrentDay ? "text-blue-600" : ""}`}
              >
                {format(day, "d")}
              </span>

              <div className="flex-1 space-y-1 mt-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 rounded truncate text-white"
                    style={{ backgroundColor: event.color }}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 font-medium">
                
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;

// **
//  * CalendarGrid Component
//  
//  * Displays a grid of calendar days, each with associated events.
//  * Shows up to 3 events per day with a "+N more" message if additional events exist.
//  * Highlights the current day and handles selection and navigation.
//  */