import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'gatsby';
import { readableColor } from 'polished';
import 'typeface-work-sans';
import { Box, Flex } from '../elements';
import Logo from './logo';
import theme from '../../config/theme';
import './layout.css';

const isPartiallyActive = ({
  isPartiallyCurrent
}: {
  isPartiallyCurrent: boolean;
}) =>
  isPartiallyCurrent
    ? { className: 'navlink-active navlink' }
    : { className: 'navlink' };

const PartialNavLink = ({
  children,
  to,
  ...rest
}: {
  children: React.ReactNode;
  to: string;
}) => (
  <Link getProps={isPartiallyActive} to={to} {...rest}>
    {children}
  </Link>
);

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.theme.sidebarWidth.big} 1fr;
  @media (max-width: ${(props) => props.theme.breakpoints[4]}) {
    grid-template-columns: ${(props) => props.theme.sidebarWidth.normal} 1fr;
  }

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
  }
`;

const SideBarInner = styled(Box)<{ bg: string }>`
  position: fixed;
  height: 100%;
  width: ${(props) => props.theme.sidebarWidth.big};
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: ${(props) => props.bg};
  overflow: auto;

  @media (max-width: ${(props) => props.theme.breakpoints[4]}) {
    width: ${(props) => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    position: relative;
    width: 100%;
    overflow: visible;
  }

  svg {
    fill: ${(props) => readableColor(`${props.bg}`)};
  }
`;

const NavButton = styled.button<{ open: boolean }>`
  width: 34px;
  height: 30px;
  position: relative;
  display: flex;
  align-items: center;
  appearance: none;
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  cursor: pointer;

  &:focus {
    outline: 1px dotted white;
    outline-offset: 10px;
  }

  &::before,
  &::after {
    content: '';
    display: block;
    height: 2px;
    border-radius: 1px;
    background-color: black;
    position: absolute;
    left: 50%;
    width: ${(props) => (props.open ? '0px' : '100%')};
    transform: translateX(-50%);
    transition: opacity 0.2s, width 0.2s;
    opacity: ${(props) => (props.open ? '0' : '1')};
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  span {
    position: relative;
    height: 2px;
    width: 100%;
    display: block;

    &::before,
    &::after {
      content: '';
      display: block;
      height: 2px;
      border-radius: 1px;
      background-color: black;
      position: absolute;
      width: 100%;
      transition: transform 0.2s;
    }

    &::before {
      transform: ${(props) => (props.open ? 'rotate(45deg);' : 'none')}
    }

    &::after {
      transform: ${(props) => (props.open ? 'rotate(-45deg);' : 'none')}
    }
  }

  @media (min-width: calc(${(props) => props.theme.breakpoints[2]} + 1px)) {
    display: none;
  }
`;

const Nav = styled(Flex)<{ color: string; visible: boolean }>`
  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    padding: 20px;
    z-index: 11;
    box-sizing: border-box;
    font-size: ${(props) => props.theme.fontSizes[4]};
  }

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    font-size: ${(props) => props.theme.fontSizes[2]};
  }

  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    font-size: ${(props) => props.theme.fontSizes[1]};
  }

  @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
    font-size: ${(props) => props.theme.fontSizes[0]};
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 6px;
  }

  ul ul {
    margin-left: 10px;
    margin-top: 6px;
    font-size: 90%;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
    line-height: 1.5;
    &:hover,
    &:focus,
    &.navlink-active {
      color: ${(props) => readableColor(`${props.color}`)};
    }
  }
`;

const SideBarContactDetails = styled(Box)<{ bg: string }>`
  color: ${(props) => props.theme.colors.primary};

  span {
    display: block;
    margin-bottom: 0.5em;
    padding-bottom: 0.5em;
    font-size: 12px;
  }

  span::after {
    content: '';
    display: block;
    width: 50px;
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  }

  p {
    margin-bottom: 0;
    margin-top: 2em;
    line-height: 1.5;
  }
`;

const Main = styled.main`
  @media (min-width: calc(${(props) => props.theme.breakpoints[2]} + 1px)) {
    grid-column-start: 2;
  }
`;

type LayoutProps = { children: React.ReactNode } & typeof defaultProps;

const defaultProps = {
  color: '#BFD9D7'
};

const Layout = ({ children, color }: LayoutProps) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <SideBarInner bg="#BFD9D7" as="aside" p={[6, 6, 8]}>
          <Flex
            flexWrap="nowrap"
            flexDirection={['row', 'row', 'row', 'column']}
            alignItems={['center', 'center', 'center', 'flex-start']}
            justifyContent="space-between"
          >
            <Box width={['3rem', '4rem', '5rem', '6rem']}>
              <Link to="/" aria-label="LekoArts, Back to Home">
                <Logo />
              </Link>
            </Box>
            <NavButton open={navOpen} onClick={() => setNavOpen(!navOpen)}>
              <span></span>
            </NavButton>
            <Nav
              visible={navOpen}
              color={color}
              mt={[0, 0, 0, 10]}
              as="nav"
              flexWrap="nowrap"
              flexDirection="column"
              alignItems="flex-start"
            >
              <ul>
                <li>
                  <PartialNavLink to="/about">About</PartialNavLink>
                </li>
                <li>
                  <PartialNavLink to="/cakes">Cakes</PartialNavLink>
                  <ul>
                    <li>
                      <PartialNavLink to="/cakesickles">Cakesickles</PartialNavLink>
                    </li>
                    <li>
                      <PartialNavLink to="/cupcakes">Cupcakes</PartialNavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <PartialNavLink to="/instagram">Instagram</PartialNavLink>
                </li>
                <li>
                  <PartialNavLink to="/prices">Prices</PartialNavLink>
                </li>
                <li>
                  <PartialNavLink to="/testimonials">Testimonials</PartialNavLink>
                </li>
              </ul>
              <SideBarContactDetails>
                <p>
                  <span>Contact me for a quote</span>
                  <a href="tel:07969 444047">07969 444047</a>
                  <br />
                  <a href="mailto:roselyndsey15@yahoo.co.uk">
                    roselyndsey15@yahoo.co.uk
                  </a>
                </p>
              </SideBarContactDetails>
            </Nav>
          </Flex>
        </SideBarInner>
        <Main>{children}</Main>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;

Layout.defaultProps = defaultProps;
