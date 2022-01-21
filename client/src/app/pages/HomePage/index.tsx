import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { TheSiteChat } from 'app/components/TheSiteChat/Loadable';
import { SiteHeader } from '../../components/SiteHeader/Loadable';
import { TheSiteTranslator } from '../../components/TheSiteTranslator/Loadable';
import styled from 'styled-components/macro';

export function HomePage() {
  return (
    <HomepageWrapper>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Backyard chat homepage" />
      </Helmet>
      <TheSiteChat />
      {/* <TheSiteTranslator /> */}
    </HomepageWrapper>
  );
}

const HomepageWrapper = styled.div`
`;