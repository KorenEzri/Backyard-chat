import * as React from 'react';
import { render } from '@testing-library/react';

import { BaseSiteBanner } from '..';


describe('<BaseSiteBanner  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<BaseSiteBanner />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
