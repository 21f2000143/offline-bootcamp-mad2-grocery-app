import { createStore } from "vuex";
import {
  fetchMedicalRecords,
  fetchDoctorSlots,
  fetchAppointments,
  fetchNotifications,
  fetchPatientProfile,
  fetchDoctorProfile,
  updateMedicalRecord,
  updateDoctorSlot,
  updateAppointment,
  updateNotification,
  updatePatientProfile,
  updateDoctorProfile,
} from "../services/apiServices";
const store = createStore({
  state: {
    medicalRecords: [],
    doctorSlots: [],
    appointments: [],
    notifications: [],
    patientProfile: {},
    doctorProfile: {},
  },
  getters: {
    getMedicalRecords: (state) => state.medicalRecords,
    getDoctorSlots: (state) => state.doctorSlots,
    getAppointments: (state) => state.appointments,
    getNotifications: (state) => state.notifications,
    getPatientProfile: (state) => state.patientProfile,
    getDoctorProfile: (state) => state.doctorProfile,
  },
  mutations: {
    setMedicalRecords: (state, medicalRecords) => {
      state.medicalRecords = medicalRecords;
    },
    setDoctorSlots: (state, doctorSlots) => {
      state.doctorSlots = doctorSlots;
    },
    setAppointments: (state, appointments) => {
      state.appointments = appointments;
    },
    setNotifications: (state, notifications) => {
      state.notifications = notifications;
    },
    setPatientProfile: (state, patientProfile) => {
      state.patientProfile = patientProfile;
    },
    setDoctorProfile: (state, doctorProfile) => {
      state.doctorProfile = doctorProfile;
    },
  },
  actions: {
    async fetchMedicalRecords({ commit }) {
      try {
        const data = await fetchMedicalRecords();
        commit("setMedicalRecords", data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchDoctorSlots({ commit }) {
      try {
        const data = await fetchDoctorSlots();
        commit("setDoctorSlots", data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAppointments({ commit }) {
      try {
        const data = await fetchAppointments();
        commit("setAppointments", data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchNotifications({ commit }) {
      try {
        const data = await fetchNotifications();
        commit("setNotifications", data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPatientProfile({ commit }) {
      try {
        const data = await fetchPatientProfile();
        commit("setPatientProfile", data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchDoctorProfile({ commit }) {
      try {
        const data = await fetchDoctorProfile();
        commit("setDoctorProfile", data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateMedicalRecord({ commit }, medicalRecord) {
      try {
        const data = await updateMedicalRecord(medicalRecord);
        commit("setMedicalRecords", data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateDoctorSlot({ commit }, doctorSlot) {
      try {
        const data = await updateDoctorSlot(doctorSlot);
        commit("setDoctorSlots", data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateAppointment({ commit }, appointment) {
      try {
        const data = await updateAppointment(appointment);
        commit("setAppointments", data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateNotification({ commit }, notification) {
      try {
        const data = await updateNotification(notification);
        commit("setNotifications", data);
      } catch (error) {
        console.error(error);
      }
    },
    async updatePatientProfile({ commit }, patientProfile) {
      try {
        const data = await updatePatientProfile(patientProfile);
        commit("setPatientProfile", data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateDoctorProfile({ commit }, doctorProfile) {
      try {
        const data = await updateDoctorProfile(doctorProfile);
        commit("setDoctorProfile", data);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export default store;




