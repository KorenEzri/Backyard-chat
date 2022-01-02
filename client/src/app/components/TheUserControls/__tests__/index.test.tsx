import * as React from 'react';
import { render } from '@testing-library/react';

import { TheUserControls } from '..';


describe('<TheUserControls  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<TheUserControls />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
