import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { addEvent } from "../../redux/calenderSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const CalendarPage = () => {
  const dispatch = useDispatch(); 
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventColor, setEventColor] = useState("");
  const [defaultEvents, setDefaultEvents] = useState([
    {
      id: "1",
      title: "Event 1",
      start: "2024-12-10T00:00:00Z",
      className: "Success"
    },
    {
      id: "2",
      title: "Event 2",
      start: "2024-12-10T00:00:00Z",
      className: "Success",
    },
  ]);

  const toggleModal = (type = "", event = null) => {
    setShowModal(!showModal);
    setModalType(type);
    setSelectedEvent(event);
    setEventTitle(event ? event.title : "");
    setEventColor(event ? event.className : "");
  };

  const handleDateSelect = (selectInfo) => {
    toggleModal("add");
    setSelectedEvent(selectInfo);
  };

  const handleEventClick = (clickInfo) => {
    toggleModal("edit", clickInfo.event);
  };

  const saveEvent = async () => {
    if (modalType === "add") {
      const newEvent = {
        title: eventTitle,
        category: eventColor,
        eventDate: selectedEvent.startStr,
      };
  
      try {
        const result = await dispatch(addEvent(newEvent)).unwrap();
        const formattedEvent = {
          title: result.title,
          start: result.eventDate, 
          className: result.category
        };
        setDefaultEvents(prevEvents => [...prevEvents, formattedEvent]);
        toggleModal();
        toast.success("Event added successfully");
      } catch (error) {
        console.error("Failed to add event:", error);
        toast.error("Failed to add event");
      }
    } else if (modalType === "edit") {
      const updatedEvents = defaultEvents.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, title: eventTitle, className: eventColor }
          : event
      );
      setDefaultEvents(updatedEvents);
      toggleModal();
      toast.success("Event updated successfully");
    }
  };
  
  const deleteEvent = () => {
    const updatedEvents = defaultEvents.filter(
      (event) => event.id !== selectedEvent.id
    );
    setDefaultEvents(updatedEvents);
    toggleModal();
  };

  const colorOptions = [
    { value: "Primary", label: "Primary" },
    { value: "Success", label: "Success" },
    { value: "Warning", label: "Warning" },
    { value: "Danger", label: "Danger" },
  ];

  return (
    <div className="container mx-auto max-w-screen-lg xl:max-w-screen-2xl pt-16">
      <div className="card">
        <div className="overflow-x-auto">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            events={defaultEvents}
            select={handleDateSelect}
            eventClick={handleEventClick}
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-yellow-500 p-6 rounded-lg w-[350px]">
            <h3 className="text-xl font-bold mb-4">
              {modalType === "add" ? "Add Event" : "Edit Event"}
            </h3>
            <div className="mb-4">
              <label className="block mb-2">Event Title</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Event Color</label>
              <select
                className="border p-2 w-full"
                value={eventColor}
                onChange={(e) => setEventColor(e.target.value)}
              >
                <option value="">Select Color</option>
                {colorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              {modalType === "edit" && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={deleteEvent}
                >
                  Delete
                </button>
              )}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={saveEvent}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => toggleModal()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;