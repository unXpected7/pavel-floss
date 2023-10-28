import { ToastType } from '@widgets/Toast';
import { create } from 'zustand';

interface iGlobal {
  loading: boolean;
  setLoading: (L: boolean) => void;
  showToast: boolean;
  toastMsg?: string;
  toastType: ToastType;
  setToast: ({
    show,
    msg,
    type,
  }: {
    show: boolean;
    msg: string;
    type: ToastType;
  }) => void;
}

export const useStoreGlobal = create<iGlobal>()((set) => ({
  loading: false,
  showToast: false,
  toastType: 'success',
  setLoading: (L) => set({ loading: L }),
  setToast: ({ show, msg, type }) => {
    console.log({ show, msg, type });

    set({ showToast: show, toastMsg: msg, toastType: type });
  },
}));
