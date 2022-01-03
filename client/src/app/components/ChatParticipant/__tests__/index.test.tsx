import * as React from 'react';
import { render } from '@testing-library/react';

import { ChatParticipant } from '..';


describe('<ChatParticipant  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ChatParticipant />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
