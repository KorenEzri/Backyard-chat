import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { TheSiteChat } from 'app/components/TheSiteChat/Loadable';
import { SiteHeader } from '../../components/SiteHeader/Loadable';
import { TheSiteTranslator } from '../../components/TheSiteTranslator/Loadable';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Backyard chat homepage" />
      </Helmet>
      <SiteHeader />
      <TheSiteChat />
      {/* <TheSiteTranslator /> */}
    </>
  );
}
