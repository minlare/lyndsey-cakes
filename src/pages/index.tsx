import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { animated, useSpring, config } from 'react-spring';
import Layout from '../components/layout';
import GridItem from '../components/grid-item';
import SEO from '../components/SEO';
import { ChildImageSharp } from '../types';

type PageProps = {
  data: {
    firstCake: {
      nodes: {
        frontmatter: {
          title: string;
          slug: string;
          featuredimage: ChildImageSharp;
        };
      }[];
    };
    threeCakes: {
      nodes: {
        frontmatter: {
          title: string;
          slug: string;
          featuredimage: ChildImageSharp;
        };
      }[];
    };
    aboutUs: ChildImageSharp;
    instagram: ChildImageSharp;
  };
};

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 35vw 40vw 25vw;
  grid-template-areas:
    'first-cake about-us about-us'
    'three-cakes three-cakes three-cakes'
    'instagram instagram instagram';

  @media (max-width: ${(props) => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 35vw 30vw 30vw 25vw;

    grid-template-areas:
      'first-cake first-cake about-us about-us'
      'three-cakes three-cakes three-cakes three-cakes'
      'three-cakes three-cakes three-cakes three-cakes'
      'instagram instagram instagram instagram';
  }

  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 38vw);

    grid-template-areas:
      'first-cake about-us'
      'three-cakes three-cakes'
      'three-cakes three-cakes'
      'three-cakes three-cakes'
      'instagram instagram';
  }

  @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 50vw);

    grid-template-areas:
      'first-cake'
      'about-us'
      'three-cakes'
      'three-cakes'
      'three-cakes'
      'instagram';
  }
`;

const FirstCake = styled(GridItem)`
  grid-area: first-cake;
`;

const AboutUs = styled(GridItem)`
  grid-area: about-us;
`;

const ThreeCakes = styled.div`
  grid-area: three-cakes;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

const Instagram = styled(GridItem)`
  grid-area: instagram;
`;

const Index: React.FunctionComponent<PageProps> = ({
  data: { firstCake, threeCakes, aboutUs, instagram }
}) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  firstCake = firstCake.nodes[0].frontmatter;

  return (
    <Layout>
      <SEO />
      <Area style={pageAnimation}>
        <FirstCake
          to={`/${firstCake.slug}`}
          aria-label={`View cake "${firstCake.title}"`}
        >
          <Img fluid={firstCake.featuredimage.childImageSharp.fluid} />
          <span>{firstCake.title}</span>
        </FirstCake>
        <AboutUs to="/about" aria-label="Visit my about page">
          <Img fluid={aboutUs.childImageSharp.fluid} />
          <span>About</span>
        </AboutUs>
        <ThreeCakes>
          {threeCakes.nodes.map(
            ({ frontmatter: { slug, title, featuredimage } }) => {
              return (
                <GridItem
                  to={`/${slug}`}
                  key={slug}
                  aria-label={`View cake "${title}"`}
                >
                  <Img fluid={featuredimage.childImageSharp.fluid} />
                  <span>{title}</span>
                </GridItem>
              );
            }
          )}
        </ThreeCakes>
        <Instagram to="/instagram" aria-label="See my Instagram pictures">
          <Img fluid={instagram.childImageSharp.fluid} />
          <span>Instagram</span>
        </Instagram>
      </Area>
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query Index {
    firstCake: allMarkdownRemark(limit: 1) {
      nodes {
        frontmatter {
          featuredimage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          title
          slug
        }
      }
    }
    threeCakes: allMarkdownRemark(limit: 3, skip: 1) {
      nodes {
        frontmatter {
          featuredimage {
            childImageSharp {
              fluid(quality: 95, maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          title
          slug
        }
      }
    }
    aboutUs: file(
      sourceInstanceName: { eq: "images" }
      name: { eq: "about-us" }
    ) {
      childImageSharp {
        fluid(quality: 95, maxWidth: 1200) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    instagram: file(
      sourceInstanceName: { eq: "images" }
      name: { eq: "instagram" }
    ) {
      childImageSharp {
        fluid(quality: 95, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
