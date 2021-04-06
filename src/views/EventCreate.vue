<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <!-- <ul>
      <li v-for="cat in categoriesSorted" :key="cat">{{ cat }}</li>
    </ul> -->
    <p>{{ thisEvent }}</p>
    <p>this is events</p>
    <ul>
      <li v-for="event in events" :key="event.id">{{ event.name }}</li>
    </ul>
    <button @click="createEvent" :disabled="isLoading">create event</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      event: {},
    };
  },
  computed: {
    ...mapState({
      user: "user",
      categories: "categories",
      events: "events",
      isLoading: "isLoading",
    }),
    ...mapGetters(["getEventById"]),
    categoriesSorted() {
      const categories = [...this.categories];
      return categories.sort();
    },

    thisEvent() {
      return this.getEventById(1);
    },
  },
  methods: {
    createEvent() {
      this.event = {
        id: this.events.length + Date.now(),
        name: `${this.events.length + 1} ttttttt`,
      };
      this.$store.dispatch("createEvent", this.event).then(() => {
        this.$router.push({
          name: "event-show",
          params: { id: this.event.id },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
