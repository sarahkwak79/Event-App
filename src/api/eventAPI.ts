const BASE_URL = 'https://api.hackthenorth.com/v3/events';

export const fetchEvents = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

export const fetchEventById = async (eventId: number) => {
  const response = await fetch(`${BASE_URL}/${eventId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch event with ID ${eventId}`);
  }
  return response.json();
};
