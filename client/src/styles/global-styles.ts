import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: whitesmoke;
    user-select: none;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  @font-face {
    font-family: 'backyardregular';
    src: url('../assets/backyard/backyard-regular-webfont.woff2') format('woff2'),
         url('../assets/backyard/backyard-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
`;
