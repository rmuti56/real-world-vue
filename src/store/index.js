import EventService from "@/services/EventService";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const ADD_EVENT = "ADD_EVENT";
const EVENT_SUCCESS = "EVENT_SUCCESS";
const EVENT_REQUEST = "EVENT_REQUEST";
const SET_EVENTS = "SET_EVENTS";
const EVENT_FAILURE = "EVENT_FAILURE";
const SET_EVENT = "SET_EVENT";

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Adam Jahr" },
    categories: ["food", "community", "education", "animal welfare"],
    events: [],
    isLoading: false,
    errorMessage: "",
    event: undefined,
  },
  mutations: {
    [EVENT_REQUEST](state) {
      state.isLoading = true;
    },
    [ADD_EVENT](state, event) {
      state.events.push(event);
    },
    [EVENT_SUCCESS](state) {
      state.isLoading = false;
    },
    [SET_EVENTS](state, events) {
      state.events = events;
    },
    [EVENT_FAILURE](state, errorMessage) {
      state.isLoading = false;
      state.errorMessage = errorMessage;
    },
    [SET_EVENT](state, event) {
      state.event = event;
    },
  },
  actions: {
    createEvent({ commit }, event) {
      commit(EVENT_REQUEST);
      EventService.postEvent(event)
        .then(() => {
          commit(ADD_EVENT, event);
          commit(EVENT_SUCCESS);
        })
        .catch((error) => {
          console.error(error);
          commit(EVENT_FAILURE, error.response?.status ?? error);
        });
    },
    fetchEvents({ commit }, { perPage, page }) {
      commit(EVENT_REQUEST);
      EventService.getEvents({ perPage, page })
        .then((response) => {
          commit(SET_EVENTS, response.data);
          commit(EVENT_SUCCESS);
        })
        .catch((error) => {
          console.log(error.response);
          console.error(error);
          commit(EVENT_FAILURE, error.response?.status ?? error);
        });
    },
    fetchEvent({ commit, getters }, eventId) {
      const event = getters.getEventById(eventId);

      if (event) {
        return commit(SET_EVENT, event);
      }
      console.log(event);
      commit(EVENT_REQUEST);
      EventService.getEvent(eventId)
        .then((response) => {
          commit(SET_EVENT, response.data);
          commit(EVENT_SUCCESS);
        })
        .catch((error) => {
          console.log(error.response);
          console.error(error);
          commit(EVENT_FAILURE, error.response?.status ?? error);
        });
    },
  },
  modules: {},
  getters: {
    catLength: (state) => {
      return state.categories.length;
    },
    getEventById: (state) => (eventId) => {
      return state.events.find((event) => event.id === eventId);
    },
  },
});
