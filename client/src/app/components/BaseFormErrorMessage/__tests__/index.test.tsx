import * as React from 'react';
import { render } from '@testing-library/react';

import { BaseFormErrorMessage } from '..';


describe('<BaseFormErrorMessage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<BaseFormErrorMessage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
