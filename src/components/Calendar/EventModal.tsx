/**
 * EventModal Component

  This modal allows users to add, edit, or delete calendar events.
 It uses the `CalendarContext` for managing modal state and event data.
 *The form includes fields for title, description, date, time, and category with dynamic color tagging.
 */

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Tag, Trash2 } from 'lucide-react';
import { useCalendar } from '../../context/CalendarContext';
import { format } from 'date-fns';

// Define valid categories for events
type Category = 'meeting' | 'personal' | 'work' | 'other';

// Define the shape of event data used in the form
interface FormData {
  title: string;
  description: string;
  date: string;
  time: string;
  category: Category;
  color: string;
}

const EventModal: React.FC = () => {
  // Calendar context methods and data
  const {
    isModalOpen,
    editingEvent,
    closeModal,
    addEvent,
    updateEvent,
    deleteEvent,
    selectedDate
  } = useCalendar();

  // Mapping of category to its respective background color
  const categoryColors: Record<Category, string> = {
    meeting: '#3B82F6',
    personal: '#10B981',
    work: '#8B5CF6',
    other: '#F59E0B',
  };

  // Component-level state for form inputs
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date: format(selectedDate, 'yyyy-MM-dd'), // Default to selected date
    time: '09:00',
    category: 'work',
    color: categoryColors['work'],
  });

  // Sync form data when editing an event or when the selected date changes
  useEffect(() => {
    if (editingEvent) {
      // Populate form with existing event data for editing
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description,
        date: editingEvent.date,
        time: editingEvent.time,
        category: editingEvent.category,
        color: editingEvent.color
      });
    } else {
      // Reset form when adding a new event
      setFormData({
        title: '',
        description: '',
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: '09:00',
        category: 'work',
        color: categoryColors['work'],
      });
    }
  }, [editingEvent, selectedDate]);

  // Handle form submission (create or update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, formData); // Update existing event
    } else {
      addEvent(formData); // Create new event
    }
    closeModal(); // Close modal after submission
  };

  // Handle event deletion
  const handleDelete = () => {
    if (editingEvent) {
      deleteEvent(editingEvent.id);
      closeModal();
    }
  };

  // Change category and update the color accordingly
  const handleCategoryChange = (category: Category) => {
    setFormData(prev => ({
      ...prev,
      category,
      color: categoryColors[category]
    }));
  };

  // Do not render modal if not open
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date & Time Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(categoryColors).map(([category, color]) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category as Category)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    formData.category === category
                      ? 'border-gray-400 bg-gray-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm capitalize">{category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            {editingEvent && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            )}

            <div className="flex space-x-3 ml-auto">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingEvent ? 'Update' : 'Create'} Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
