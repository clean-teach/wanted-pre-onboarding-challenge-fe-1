import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color: #ffffff;
  color:black;
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
}
button {
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
}
`;

export const AuthArea = styled.div`
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  form {
    width: 560px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    input {
      width: 100%;
      font-size: 1rem;
      padding: 1rem;
      &.warning {
        border-color: #ffaaaa;
        background-color: #ffcccc;
        &:focus {
          border-color: #333333;
          background-color: #ffffff;
        }
      }
      &.success {
        border-color: #aaffaa;
        background-color: #ccffcc;
      }
    }
    p {
      color: red;
    }
    button {
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;
