import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Event = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" or "edit"
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventColor, setEventColor] = useState("");
  const [defaultEvents, setDefaultEvents] = useState([
    {
      id: "1",
      title: "Event 1",
      start: new Date().toISOString(),
      className: "bg-primary",
    },
    {
      id: "2",
      title: "Event 2",
      start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      className: "bg-success",
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

  const saveEvent = () => {
    if (modalType === "add") {
      const calendarApi = selectedEvent.view.calendar;
      calendarApi.unselect(); // Clear selection

      if (eventTitle) {
        const newEvent = {
          id: String(defaultEvents.length + 1),
          title: eventTitle,
          start: selectedEvent.startStr,
          end: selectedEvent.endStr,
          className: eventColor,
        };
        setDefaultEvents([...defaultEvents, newEvent]);
      }
    } else if (modalType === "edit") {
      const updatedEvents = defaultEvents.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, title: eventTitle, className: eventColor }
          : event
      );
      setDefaultEvents(updatedEvents);
    }

    toggleModal();
  };

  const deleteEvent = () => {
    const updatedEvents = defaultEvents.filter(
      (event) => event.id !== selectedEvent.id
    );
    setDefaultEvents(updatedEvents);
    toggleModal();
  };

  const colorOptions = [
    { value: "bg-primary", label: "Primary" },
    { value: "bg-success", label: "Success" },
    { value: "bg-info", label: "Info" },
    { value: "bg-warning", label: "Warning" },
    { value: "bg-danger", label: "Danger" },
  ];

  return (
    <div className="container  mx-auto max-w-screen-lg xl:max-w-screen-2xl ">
      <div className="card">
        <div className="overflow-y-auto">
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

export default Event;
