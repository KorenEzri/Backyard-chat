import * as React from 'react';
import { render } from '@testing-library/react';

import { BaseTitle } from '..';


describe('<BaseTitle  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<BaseTitle />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
