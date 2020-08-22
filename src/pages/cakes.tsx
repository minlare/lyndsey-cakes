import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { config, animated, useSpring } from 'react-spring';
import Layout from '../components/layout';
import GridItem from '../components/grid-item';
import SEO from '../components/SEO';
import { ChildImageSharp } from '../types';

type PageProps = {
  data: {
    cakes: {
      nodes: {
        title: string;
        slug: string;
        cover: ChildImageSharp;
      }[];
    };
  };
};

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 50vw;

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
    grid-auto-rows: 60vw;
  }
`;

const Cakes: React.FunctionComponent<PageProps> = ({ data: { cakes } }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <Layout>
      <SEO title="Cakes | Jodie" />
      <Area style={pageAnimation}>
        {cakes.nodes.map((cake) => (
          <GridItem
            key={cake.slug}
            to={cake.slug}
            aria-label={`View cake "${cake.title}"`}
          >
            <Img fluid={cake.cover.childImageSharp.fluid} />
            <span>{cake.title}</span>
          </GridItem>
        ))}
      </Area>
    </Layout>
  );
};

export default Cakes;

export const query = graphql`
  query Cakes {
    cakes: allCakesYaml {
      nodes {
        title
        slug
        cover {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
