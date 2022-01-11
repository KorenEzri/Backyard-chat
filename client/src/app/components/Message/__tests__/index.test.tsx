import * as React from 'react';
import { render } from '@testing-library/react';

import { Message } from '..';


describe('<Message  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Message />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
