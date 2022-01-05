import * as React from 'react';
import { render } from '@testing-library/react';

import { SomePrivatePage } from '..';


describe('<SomePrivatePage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SomePrivatePage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
