import { create } from 'zustand';
import axios from '../api/axios';

const useReservationStore = create((set) => ({
  reservations: [],
  isLoading: false,
  error: null,

  fetchReservations: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get('/reservations');
      set({ reservations: data, isLoading: false, error: null });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },

  deleteReservation: async (id) => {
    try {
      await axios.delete(`/reservations/${id}`);
      set(state => ({ reservations: state.reservations.filter(r => r._id !== id) }));
      return true;
    } catch (error) {
      return false;
    }
  }
}));

export default useReservationStore;
