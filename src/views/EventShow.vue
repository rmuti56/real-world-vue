<template>
  <div>
    <h1>Event {{ id }}</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <h4>{{ event.name }}</h4>
      <p>{{ event.email }}</p>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["id"],
  computed: {
    ...mapState(["isLoading", "event"]),
  },
  async created() {
    this.$store.dispatch("fetchEvent", this.id);
  },
};
</script>
