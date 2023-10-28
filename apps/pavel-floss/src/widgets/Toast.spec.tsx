import * as React from 'react';
import { render } from '@testing-library/react-native';

import Toast from './Toast';

jest.mock('../zustand/global.ts', () => {
  return {
    loading: false,
    showToast: true,
    toastType: 'success',
    setLoading: () => ({}),
    setToast: () => ({}),
  };
});

test('renders correctly', () => {
  const { root } = render(<Toast />);
  setTimeout(() => {
    //loading fontFomaly
    expect(root).toBeTruthy();
  }, 1000);
});
