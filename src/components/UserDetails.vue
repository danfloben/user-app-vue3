<template>
    <div class="user-details">
        <h2>User Details</h2>
        <ul v-if="userList">
            <li><strong>First Name:</strong> {{ userDetail.firstName }}</li>
            <li><strong>Last Name:</strong> {{ userDetail.lastName }}</li>
            <li><strong>Maiden Name:</strong> {{ userDetail.maidenName }}</li>
            <li><strong>Age:</strong> {{ userDetail.age }}</li>
            <li><strong>Gender:</strong> {{ userDetail.gender }}</li>
            <li><strong>Email:</strong> {{ userDetail.email }}</li>
            <li><strong>Phone:</strong> {{ userDetail.phone }}</li>
            <li><strong>Username:</strong> {{ userDetail.username }}</li>
            <li><strong>Birth Date:</strong> {{ userDetail.birthDate }}</li>
            <li><strong>Image:</strong> <img  v-bind:src="userDetail.image"  alt="User Image"></li>
            <li><strong>Blood Group:</strong> {{ userDetail.bloodGroup }}</li>
            <li><strong>Height:</strong> {{ userDetail.height }}</li>
            <li><strong>Weight:</strong> {{ userDetail.height }}</li>
            <li><strong>Eye Color:</strong> {{ userDetail.birthDate }}</li>
            <li><strong>Hair Color:</strong> {{ userDetail.hair.color }}</li>
            <li><strong>Hair Type:</strong> {{ userDetail.hair.type }}</li>
            <li><strong>City:</strong> {{ userDetail.city }}</li>
            <li><strong>Postal Code:</strong> {{ userDetail.birthDate }}</li>
            <li><strong>State:</strong> {{ userDetail.state }}</li>
            <li><strong>Mac Address:</strong> 13:69:BA:56:A3:74</li>
            <li><strong>University:</strong> Capitol University</li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { useStore, mapGetters } from 'vuex';

export default {
    mounted() {
        this.fetchUserList();
    },
    computed: {
        ...mapGetters([
            'getUsers'
        ])
    },
    data() {
        return {
            loaded: false,
            userDetail: {},
            userList: []
        };
    },
    setup() {
        var userDetail = ref(null);
        const userList = ref(null);
        const route = useRoute()
        const store = useStore();

        async function fetchUserList() {
            try {
                await store.dispatch('getUsers');
                userList.value = store.getters.users;
                userDetail.value = store.getters.userById(route.params.id);
            } catch (error) {
                console.error(error);
            }
        }
        return { userDetail, fetchUserList, userList };
    },
}
</script>