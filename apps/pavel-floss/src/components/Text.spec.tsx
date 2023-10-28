import * as React from 'react';
import { render } from '@testing-library/react-native';

import Text from './Text';

test('renders correctly', () => {
  const { root } = render(<Text text="hello world" />);
  setTimeout(() => {
    //loading fontFomaly
    expect(root).toBeTruthy();
  }, 1000);
});
