// import React from 'react';
// import { format, addMonths, subMonths } from 'date-fns';
// import { ChevronLeft, ChevronRight, Plus, Download } from 'lucide-react';
// import { useCalendar } from '../../context/CalendarContext';
// import * as XLSX from 'xlsx';

// const CalendarHeader: React.FC = () => {
//   const { currentMonth, setCurrentMonth, openModal, events } = useCalendar();

//   const handlePreviousMonth = () => {
//     setCurrentMonth(subMonths(currentMonth, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth(addMonths(currentMonth, 1));
//   };

//   const handleExportToExcel = () => {
//     const exportData = events.map(event => ({
//       Title: event.title,
//       Description: event.description,
//       Date: event.date,
//       Time: event.time,
//       Category: event.category,
//       Color: event.color
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Calendar Events');
    
//     const fileName = `calendar_events_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
//     XLSX.writeFile(workbook, fileName);
//   };

//   return (
//     <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={handlePreviousMonth}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//         >
//           <ChevronLeft className="w-5 h-5 text-gray-600" />
//         </button>
        
//         <h1 className="text-xl font-semibold text-gray-800">
//           {format(currentMonth, 'MMMM yyyy')}
//         </h1>
        
//         <button
//           onClick={handleNextMonth}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//         >
//           <ChevronRight className="w-5 h-5 text-gray-600" />
//         </button>
//       </div>

//       <div className="flex items-center space-x-3">
//         <button
//           onClick={handleExportToExcel}
//           className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//         >
//           <Download className="w-4 h-4" />
//           <span>Export Excel</span>
//         </button>
        
//         <button
//           onClick={() => openModal()}
//           className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Plus className="w-4 h-4" />
//           <span>Add Event</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CalendarHeader;

//width all code all event opiotn



// import React, { useState } from 'react';
// import { format, addMonths, subMonths } from 'date-fns';
// import { ChevronLeft, ChevronRight, Plus, Download, X } from 'lucide-react';
// import { useCalendar } from '../../context/CalendarContext';
// import * as XLSX from 'xlsx';

// const CalendarHeader: React.FC = () => {
//   const { currentMonth, setCurrentMonth, openModal, events } = useCalendar();

//   const [showAllModal, setShowAllModal] = useState(false);

//   const handlePreviousMonth = () => {
//     setCurrentMonth(subMonths(currentMonth, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth(addMonths(currentMonth, 1));
//   };

//   const handleExportToExcel = () => {
//     const exportData = events.map(event => ({
//       Title: event.title,
//       Description: event.description,
//       Date: event.date,
//       Time: event.time,
//       Category: event.category,
//       Color: event.color
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Calendar Events');

//     const fileName = `calendar_events_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
//     XLSX.writeFile(workbook, fileName);
//   };

//   return (
//     <>
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
//         {/* Left: Month Navigator */}
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={handlePreviousMonth}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-600" />
//           </button>

//           <h1 className="text-xl font-semibold text-gray-800">
//             {format(currentMonth, 'MMMM yyyy')}
//           </h1>

//           <button
//             onClick={handleNextMonth}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <ChevronRight className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Right: Actions */}
//         <div className="flex flex-col items-end space-y-2">
//           <div className="flex space-x-3">
//             <button
//               onClick={handleExportToExcel}
//               className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//             >
//               <Download className="w-4 h-4" />
//               <span>Export Excel</span>
//             </button>

//             <button
//               onClick={() => openModal()}
//               className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <Plus className="w-4 h-4" />
//               <span>Add Event</span>
//             </button>
//           </div>

//           <button
//             onClick={() => setShowAllModal(true)}
//             className="text-sm text-red-700 hover:underline mt-1"
//           >
//             Show All Events
//           </button>
//         </div>
//       </div>

//       {/* Modal for All Events */}
//       {showAllModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative">
//             <button
//               onClick={() => setShowAllModal(false)}
//               className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>

//             <h2 className="text-lg font-semibold mb-4 text-gray-800">All Events</h2>

//             {events.length === 0 ? (
//               <p className="text-sm text-gray-500">No events available.</p>
//             ) : (
//               <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
//                 {events.map(event => (
//                   <li key={event.id} className="p-3 border border-gray-200 rounded-md">
//                     <h3 className="font-semibold text-sm text-gray-800">{event.title}</h3>
//                     <p className="text-xs text-gray-500">{event.description}</p>
//                     <div className="text-xs mt-1">
//                       <span className="text-gray-600">Date:</span> {event.date} <br />
//                       <span className="text-gray-600">Time:</span> {event.time} <br />
//                       <span className="text-gray-600">Category:</span> {event.category}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CalendarHeader;


//review code puse delete button

import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Download, X, Trash2 } from 'lucide-react';
import { useCalendar } from '../../context/CalendarContext';
import * as XLSX from 'xlsx';

const CalendarHeader: React.FC = () => {
  const { currentMonth, setCurrentMonth, openModal, events, deleteEvent } = useCalendar();

  const [showAllModal, setShowAllModal] = useState(false);

  const handlePreviousMonth = () => { //for month toggle
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {  //for month toggle
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleExportToExcel = () => {   //excel download
    const exportData = events.map(event => ({
      Title: event.title,
      Description: event.description,
      Date: event.date,
      Time: event.time,
      Category: event.category,
      Color: event.color
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Calendar Events');

    const fileName = `calendar_events_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        {/* Left: Month Navigator */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <h1 className="text-xl font-semibold text-gray-800">
            {format(currentMonth, 'MMMM yyyy')}
          </h1>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col items-end space-y-2">
          <div className="flex space-x-3">
            <button
              onClick={handleExportToExcel}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Excel</span>
            </button>

            <button
              onClick={() => openModal()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>

          <button
            onClick={() => setShowAllModal(true)}
            className="text-sm text-red-700 hover:underline mt-1"
          >
            Show All Events
          </button>
        </div>
      </div>

      {/* Modal for All Events */}
      {showAllModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setShowAllModal(false)}
              className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-gray-800">All Events</h2>

            {events.length === 0 ? (
              <p className="text-sm text-gray-500">No events available.</p>
            ) : (
              <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {events.map(event => (
                  <li
                    key={event.id}
                    className="p-3 border border-gray-200 rounded-md relative"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-800">
                          {event.title}
                        </h3>
                        <p className="text-xs text-gray-500">{event.description}</p>
                        <div className="text-xs mt-1">
                          <span className="text-gray-600">Date:</span> {event.date} <br />
                          <span className="text-gray-600">Time:</span> {event.time} <br />
                          <span className="text-gray-600">Category:</span> {event.category}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this event?')) {
                            deleteEvent(event.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 text-xs p-1"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarHeader;
