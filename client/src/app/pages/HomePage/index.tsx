import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { SiteHeader } from "../../components/SiteHeader/Loadable"

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <SiteHeader />
      <span>HomePage container</span>
    </>
  );
}
