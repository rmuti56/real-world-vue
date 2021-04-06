<template>
  <div>
    <h1>Events Listing</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    <BaseIcon name="user">
      <span slot="title">User</span> <span slot="supfix">&</span>
    </BaseIcon>
  </div>
</template>
<script>
import EventCard from "@/components/EventCard.vue";
import axios from "axios";
export default {
  components: {
    EventCard,
  },
  data() {
    return {
      isLoading: true,
      events: [],
    };
  },
  async created() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      this.events = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
