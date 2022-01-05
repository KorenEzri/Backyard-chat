import * as React from 'react';
import 'typeface-roboto';
import '../assets/backyard/stylesheet.css';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';
import RoutesContainer from 'routes/RoutesContainer';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Backyard chat"
        defaultTitle="Backyard chat"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A Backyard chat application" />
      </Helmet>
      <GlobalStyle />
      <RoutesContainer />
    </BrowserRouter>
  );
}
