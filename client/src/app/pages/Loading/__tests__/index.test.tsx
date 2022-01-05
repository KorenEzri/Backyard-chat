import * as React from 'react';
import { render } from '@testing-library/react';

import { Loading } from '..';


describe('<Loading  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Loading />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
