import * as React from 'react';
import { render } from '@testing-library/react';

import { TheSiteTranslator } from '..';


describe('<TheSiteTranslator  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<TheSiteTranslator />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
