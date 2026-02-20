let attendees = [];
const MAX_CAPACITY = 100;

function addAttendee(name, email, ticketType) {
  if (!isFull()) {
    attendees.push({ name, email, ticketType });
  } else {
    console.log("Conference is full!");
  }
}

function isFull() {
  return attendees.length >= MAX_CAPACITY;
}

function listAttendees() {
  attendees.forEach((attendee, index) => {
    console.log(`${index + 1}. ${attendee.name} - ${attendee.email} (${attendee.ticketType})`);
  });
}

function countByTicketType(type) {
  return attendees.filter(a => a.ticketType === type).length;
}
