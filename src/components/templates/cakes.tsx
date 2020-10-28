import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { config, animated, useSpring } from 'react-spring';
import Layout from '../layout';
import GridItem from '../grid-item';
import SEO from '../SEO';
import { ChildImageSharp } from '../../types';

type PageProps = {
  data: {
    cakes: {
      nodes: {
        frontmatter: {
          title: string;
          slug: string;
          featuredimage: ChildImageSharp;
        };
      }[];
    };
  };
};

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 25vw;

  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 50vw;
  }

  @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    grid-auto-rows: 50vw;
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
      <SEO title="Cakes by Lyndsey Lewis" />
      <Area style={pageAnimation}>
        {cakes.nodes.map(({ frontmatter: { slug, title, featuredimage } }) => (
          <GridItem
            key={slug}
            to={`/${slug}`}
            aria-label={`View cake "${title}"`}
          >
            <Img fluid={featuredimage.childImageSharp.fluid} />
            <span>{title}</span>
          </GridItem>
        ))}
      </Area>
    </Layout>
  );
};

export default Cakes;
