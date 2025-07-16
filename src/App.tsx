
import { CalendarProvider } from './context/CalendarContext';
import { CalendarHeader, CalendarGrid, EventModal, EventList } from './components/Calendar';

function App() {
  return (
    <CalendarProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto bg-white shadow-lg">
          <CalendarHeader />
          <div className="flex">
            <div className="flex-1">
              <CalendarGrid />
            </div>
            <EventList />
          </div>
          <EventModal />
        </div>
      </div>
    </CalendarProvider>
  );
}

export default App;