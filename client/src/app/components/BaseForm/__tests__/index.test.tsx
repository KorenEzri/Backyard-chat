import * as React from 'react';
import { render } from '@testing-library/react';

import { BaseForm } from '..';


describe('<BaseForm  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<BaseForm />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
