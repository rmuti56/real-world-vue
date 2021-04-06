<template>
  <div>
    <h1>Events Listing</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <EventCard v-for="event in events" :key="event.id" :event="event" />
      <hr />
      <template v-if="page !== 1">
        <router-link
          :to="{ name: 'event-list', query: { page: page - 1 } }"
          rel="prev"
          >Prev Page</router-link
        >
        |</template
      >

      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </div>
    <BaseIcon name="user">
      <span slot="title">User</span> <span slot="supfix">&</span>
    </BaseIcon>
  </div>
</template>
<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";

export default {
  components: {
    EventCard,
  },
  computed: {
    ...mapState(["isLoading", "events"]),
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
  },
  async created() {
    this.$store.dispatch("fetchEvents", { perPage: 10, page: this.page });
  },
};
</script>
