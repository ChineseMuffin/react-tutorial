import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import PropTypes from 'prop-types';

export const Layout: React.FC = ({children}) => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header>React Tutorial</Header>
        <Body>{children}</Body>
      </Wrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const Wrapper = styled.div`
  height: 100%;
`;

const Header = styled.header`
  background-color: #09d3ac;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  padding: 0 20px;
  color: #fff;
`;

const Body = styled.div`
  height: calc(100vh - 60px);
`;
