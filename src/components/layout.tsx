import React from 'react';
import styled from 'styled-components';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { readableColor } from 'polished';
import 'typeface-work-sans';
import { Box, Flex } from '../elements';
import Logo from './logo';

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

  @media (max-width: ${(props) => props.theme.breakpoints[4]}) {
    width: ${(props) => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    position: relative;
    width: 100%;
  }

  svg {
    fill: ${(props) => readableColor(`${props.bg}`)};
  }
`;

const Nav = styled(Flex)<{ color: string }>`
  a {
    text-decoration: none;
    color: ${(props) => readableColor(`${props.color}`)};
    font-size: ${(props) => props.theme.fontSizes[3]};
    line-height: 1.5;
    &:hover,
    &:focus,
    &.navlink-active {
      color: ${(props) => props.theme.colors.primary};
    }

    @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
      font-size: ${(props) => props.theme.fontSizes[2]};
      margin-left: ${(props) => props.theme.space[4]};
    }

    @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
      font-size: ${(props) => props.theme.fontSizes[1]};
      margin-left: ${(props) => props.theme.space[3]};
    }

    @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
      font-size: ${(props) => props.theme.fontSizes[0]};
      margin-left: ${(props) => props.theme.space[2]};
    }
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

interface QueryResult {
  navigation: {
    nodes: {
      name: string;
      link: string;
    }[];
  };
}

const Layout = ({ children, color }: LayoutProps) => {
  const data: QueryResult = useStaticQuery(query);

  return (
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
          <Nav
            color={color}
            mt={[0, 0, 0, 10]}
            as="nav"
            flexWrap="nowrap"
            flexDirection={['row', 'row', 'row', 'column']}
            alignItems="flex-start"
          >
            {data.navigation.nodes.map((item) => (
              <PartialNavLink to={item.link} key={item.name}>
                {item.name}
              </PartialNavLink>
            ))}
          </Nav>
        </Flex>
      </SideBarInner>
      <Main>{children}</Main>
    </Wrapper>
  );
};

export default Layout;

Layout.defaultProps = defaultProps;

const query = graphql`
  query Layout {
    navigation: allNavigationYaml {
      nodes {
        name
        link
      }
    }
  }
`;
