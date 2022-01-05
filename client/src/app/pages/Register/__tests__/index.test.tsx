import * as React from 'react';
import { render } from '@testing-library/react';

import { Register } from '..';


describe('<Register  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Register />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
