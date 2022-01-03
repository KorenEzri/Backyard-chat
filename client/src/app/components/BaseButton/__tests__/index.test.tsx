import * as React from 'react';
import { render } from '@testing-library/react';

import { BaseButton } from '..';


describe('<BaseButton  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<BaseButton />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
