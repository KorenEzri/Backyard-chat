import * as React from 'react';
import { render } from '@testing-library/react';

import { ChatMessageList } from '..';


describe('<ChatMessageList  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ChatMessageList />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
