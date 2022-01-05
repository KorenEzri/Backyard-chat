import * as React from 'react';
import { render } from '@testing-library/react';

import { BaseInput } from '..';


describe('<BaseInput  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<BaseInput />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
