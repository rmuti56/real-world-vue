import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents({ perPage, page }) {
    return apiClient.get(`/events?_page=${page}&_limit=${perPage}`);
  },
  getEvent(eventId) {
    return apiClient.get("/events/" + eventId);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  },
};
