import { createStore } from "vuex";
import {
  fetchOreders,
  fetchCartItems,
  fetchProducts,
  fetchAuthUser,
  fetchManagers,
  fetchNoti,
  fetchCategories,
} from "../services/apiServices";
const store = createStore({
  state: {
    products: [],
    categories: [],
    notifications: [],
    managers: [],
    cart: [],
    orders: [],
    authenticatedUser: "",
  },
  getters: {
    getTotalAmount: (state) => {
      return state.cart.reduce(
        (total, cart) => total + cart.quantity * cart.rpu,
        0
      );
    },
  },
  mutations: {
    setProducts: (state, products) => {
      state.products = products;
    },
    setCategories: (state, categories) => {
      state.categories = categories;
    },
    setNotifications: (state, notifications) => {
      state.notifications = notifications;
    },
    setManagers: (state, managers) => {
      state.managers = managers;
    },
    setCart: (state, cart) => {
      state.cart = cart;
    },
    setOrders: (state, orders) => {
      state.orders = orders;
    },
    setAuthenticatedUser: (state, user) => {
      state.authenticatedUser = user;
    },
    addProduct: (state, newProduct) => {
      state.products.push(newProduct);
    },
    addCat: (state, newCategory) => {
      state.categories.push(newCategory);
    },
    addToCart: (state, newProduct) => {
      state.cart.push(newProduct);
    },
    addNoti: (state, newNoti) => {
      state.notifications.push(newNoti);
    },
    updateCategory: (state, updatedCategory) => {
      const index = state.categories.findIndex(
        (p) => p.id === updatedCategory.id
      );
      if (index !== -1) {
        state.categories.splice(index, 1, updatedCategory);
      }
    },
    updateOrder: (state, updatedOrder) => {
      const index = state.orders.findIndex((p) => p.id === updatedOrder.id);
      if (index !== -1) {
        state.orders.splice(index, 1, updatedOrder);
      }
    },
    updateProduct: (state, updatedProduct) => {
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
      }
    },
    updateToCart: (state, updatedProduct) => {
      const index = state.cart.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.cart.splice(index, 1, updatedProduct);
      }
    },
    deleteToCart: (state, itemId) => {
      state.cart = state.cart.filter((p) => p.id !== itemId);
    },
    deleteCategory: (state, categoryId) => {
      state.categories = state.categories.filter((p) => p.id !== categoryId);
    },
    deleteProduct: (state, productId) => {
      state.products = state.products.filter((p) => p.id !== productId);
    },
    addManager: (state, newManager) => {
      state.managers.push(newManager);
    },
    updateManager: (state, updatedManager) => {
      const index = state.managers.findIndex((m) => m.id === updatedManager.id);
      if (index !== -1) {
        state.managers.splice(index, 1, updatedManager);
      }
    },
    deleteManager: (state, managerId) => {
      state.managers = state.managers.filter((m) => m.id !== managerId);
    },
    deleteNotification: (state, notifiId) => {
      state.notifications = state.notifications.filter(
        (m) => m.id !== notifiId
      );
    },
  },
  actions: {
    async fetchOrders({ commit }) {
      try {
        const data = await fetchOreders();
        commit("setOrders", data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCartItems({ commit }) {
      try {
        const data = await fetchCartItems();
        console.log(data);
        console.log(data.length);
        commit("setCart", data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchProducts({ commit }) {
      try {
        const data = await fetchProducts();
        commit("setProducts", data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAuthUser({ commit }) {
      try {
        const data = await fetchAuthUser();
        commit("setAuthenticatedUser", data.resource);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchManagers({ commit }) {
      try {
        const response = await fetchManagers();
        commit("setManagers", data.resource);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchNoti({ commit }) {
      try {
        const data = await fetchNoti();
        commit("setNotifications", data.resource);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCategories({ commit }) {
      try {
        const data = await fetchCategories();
        commit("setCategories", data);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export default store;
