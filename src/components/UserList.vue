<template>
  <div>
    <h2>Add New User</h2>
    <form @submit.prevent="addUser">
      <input v-model="newUserName" type="text" placeholder="Name" required />
      <input v-model="newUserEmail" type="email" placeholder="Email" required />
      <button type="submit">Add User</button>
    </form>
    <div v-if="userList">
      <h2>Users from API</h2>
      <ul>
        <li v-for="user in userList" :key="user.id">
          {{ user.firstName }} - {{ user.email }}
          <button @click="$router.push('/users/' + user.id)">Detail</button>
          <button @click="removeUser(user.id)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  mounted() {
    this.fetchUserList();
  },
  data() {
    return {
      loaded: false,
      userList: []
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  setup() {
    const userList = ref(null);
    const newUserName = ref('');
    const newUserEmail = ref('');
    const store = useStore();

    async function fetchUserList() {
      try {
        
        await store.dispatch('getUsers');
        userList.value = store.getters.users;
      } catch (error) {
        console.error(error);
      }
    }

    function addUser() {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: newUserName.value,
        email: newUserEmail.value,
      };
      store.dispatch('addUser', newUser);
      newUserName.value = '';
      newUserEmail.value = '';
      userList.value = store.getters.users;
    }

    function removeUser(userId) {
      store.dispatch('removeUser', userId);
      userList.value = store.getters.users;
    }
    return { userList, fetchUserList, newUserName, newUserEmail, addUser, removeUser };
  },
};
</script>
