import * as React from 'react';
import { render } from '@testing-library/react';

import { ChatParticipantList } from '..';


describe('<ChatParticipantList  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ChatParticipantList />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
