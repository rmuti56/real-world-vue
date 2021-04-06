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
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      event: {},
      isLoading: true,
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${this.id}`
      );
      this.event = response.data;
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
