import * as React from 'react';
import { render } from '@testing-library/react';

import { TheSiteChat } from '..';


describe('<TheSiteChat  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<TheSiteChat />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
