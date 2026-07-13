import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  pinEntered: string;
  isPinValid: boolean;
  currentPage: string;
  hasSeenPopup: boolean;
  hasAnsweredYes: boolean;
  
  // Actions
  setPinEntered: (pin: string) => void;
  setIsPinValid: (valid: boolean) => void;
  setCurrentPage: (page: string) => void;
  setHasSeenPopup: (seen: boolean) => void;
  setHasAnsweredYes: (yes: boolean) => void;
  reset: () => void;
}

const initialState = {
  pinEntered: '',
  isPinValid: false,
  currentPage: '/',
  hasSeenPopup: false,
  hasAnsweredYes: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      setPinEntered: (pin) => set({ pinEntered: pin }),
      setIsPinValid: (valid) => set({ isPinValid: valid }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setHasSeenPopup: (seen) => set({ hasSeenPopup: seen }),
      setHasAnsweredYes: (yes) => set({ hasAnsweredYes: yes }),
      reset: () => set(initialState),
    }),
    {
      name: 'naanu-apology-store',
    }
  )
);
