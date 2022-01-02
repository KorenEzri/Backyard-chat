import * as React from 'react';
import { render } from '@testing-library/react';

import { TheIcon } from '..';


describe('<TheIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<TheIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
