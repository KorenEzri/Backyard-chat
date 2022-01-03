import * as React from 'react';
import { render } from '@testing-library/react';

import { ChatInputBox } from '..';


describe('<ChatInputBox  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ChatInputBox />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
