import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { transparentize } from 'polished';
import styled from 'styled-components';
import { config, useSpring, animated } from 'react-spring';
import Layout from '../components/layout';
import { Box, AnimatedBox, Button } from '../elements';
import SEO from '../components/SEO';

const PBox = styled(AnimatedBox)`
  max-width: 1400px;
  margin: 0 auto;
`;

const Hero = styled(Box)<{ bg: string }>`
  .gatsby-image-wrapper {
    float: right;
    margin-left: 10%;
    margin-bottom: 20px;
    width: 45%;

    @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
      float: none;
      margin-left: 0;
      width: auto;
    }
  }
`;

const Content = styled(Box)<{ bg: string }>`
  background-color: ${(props) => transparentize(0.9, props.bg)};

  .image-link {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 22%;
    max-width: 22%;
    margin-bottom: 10px;
    margin-right: 3%;
  }

  > * {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Description = styled(animated.div)`
  max-width: 960px;
  letter-spacing: -0.003em;
  --baseline-multiplier: 0.179;
  --x-height-multiplier: 0.35;
  line-height: 1.58;
`;

const PButton = styled(Button)<{ color: string }>`
  background: 'white',
  color: 'black
`;

type PageProps = {
  data: {
    cake: {
      html: string;
      frontmatter: {
        title: string;
        desc: string;
        slug: string;
        featuredimage: {
          childImageSharp: {
            fluid: {
              src: string;
            };
          };
        };
        images: {
          name: string;
          childImageSharp: {
            fluid: {
              aspectRatio: number;
              src: string;
              srcSet: string;
              sizes: string;
              base64: string;
              tracedSVG: string;
              srcWebp: string;
              srcSetWebp: string;
            };
          };
        }[];
      };
    };
  };
};

const Cake: React.FunctionComponent<PageProps> = ({ data: { cake } }) => {
  const titleAnimation = useSpring({
    config: config.slow,
    delay: 300,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  const descAnimation = useSpring({
    config: config.slow,
    delay: 600,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  const imagesAnimation = useSpring({
    config: config.slow,
    delay: 800,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <Layout>
      <SEO
        pathname={cake.frontmatter.slug}
        title={`${cake.frontmatter.title} | Cakes by Lyndsey Rose`}
        desc={cake.frontmatter.desc}
        banner={cake.frontmatter.featuredimage.childImageSharp.fluid.src}
        individual
      />
      <Hero>
        <PBox py={10} px={[6, 6, 8, 10]}>
          <animated.h1 style={titleAnimation}>
            {cake.frontmatter.title}
          </animated.h1>
          <Img
            alt={cake.frontmatter.title}
            key={cake.frontmatter.featuredimage.childImageSharp.fluid.src}
            fluid={cake.frontmatter.featuredimage.childImageSharp.fluid}
          />
          <Description style={descAnimation}>
            <div dangerouslySetInnerHTML={{ __html: cake.html }} />
          </Description>
        </PBox>
      </Hero>
      {cake.frontmatter.images && (
        <Content bg="#6e6e6e" py={10}>
          <PBox style={imagesAnimation} px={[6, 6, 8, 10]}>
            {cake.frontmatter.images.map((image) => (
              <a className="image-link" href={image.childImageSharp.fluid.src}>
                <Img
                  alt={image.name}
                  key={image.childImageSharp.fluid.src}
                  fluid={image.childImageSharp.fluid}
                />
              </a>
            ))}
          </PBox>
        </Content>
      )}
      <PBox style={{ textAlign: 'center' }} py={10} px={[6, 6, 8, 10]}>
        <h2>Want your own cake?</h2>
        <PButton py={4} px={8}>
          Contact Me
        </PButton>
      </PBox>
    </Layout>
  );
};

export default Cake;

export const query = graphql`
  query CakeTemplate($slug: String!) {
    cake: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        desc
        featuredimage {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        images {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        price
        slug
        title
      }
    }
  }
`;
