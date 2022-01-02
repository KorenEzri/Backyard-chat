import * as React from 'react';
import { render } from '@testing-library/react';

import { SiteHeader } from '..';


describe('<SiteHeader  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SiteHeader />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
