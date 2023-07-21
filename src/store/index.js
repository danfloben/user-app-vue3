import { createStore } from 'vuex';
import { getUsers } from "@/services/UserService";

export default createStore({
    state: {
        userList: [],
    },
    mutations: {
        setUsers(state, users) {
            state.userList = users.slice(0,10);
        },
        addUser(state, user) {
            state.userList.push(user);
        },
        removeUser(state, userId) {
            state.userList = state.userList.filter((user) => user.id !== userId);
        },
    },
    actions: {
        async getUsers({ commit }){
            const users = await getUsers();
            commit('setUsers', users);
        },
        addUser({ commit }, user) {
            commit('addUser', user);
        },
        removeUser({ commit }, userId) {
            commit('removeUser', userId);
        },
    },
    getters: {
        users(state) {
            return state.userList;
        },
        userById: (state) => (id) => {
            return state.userList.find((user) => user.id == id);
        },
    },
});
