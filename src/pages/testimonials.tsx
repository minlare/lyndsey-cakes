import React from 'react';
import { graphql } from 'gatsby';
import { config, useSpring } from 'react-spring';
import Layout from '../components/layout';
import { AnimatedBox } from '../elements';
import SEO from '../components/SEO';

type PageProps = {
  data: {
    testimonials: {
      nodes: {
        frontmatter: {
          name: string;
          quote: string;
        };
      }[];
    };
  };
};

const Testimonials: React.FunctionComponent<PageProps> = ({
  data: { testimonials }
}) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  console.log(testimonials);

  return (
    <Layout>
      <SEO title="Testimonials" desc="Testimonials from my clients" />
      <AnimatedBox
        style={pageAnimation}
        py={[6, 6, 6, 8]}
        px={[6, 6, 8, 6, 8, 13]}
      >
        <h1>Testimonials</h1>
      </AnimatedBox>
      {testimonials.nodes.map(
        ({ frontmatter: { name, quote } }, testimonialIndex) => (
          <AnimatedBox
            style={pageAnimation}
            py={[6, 6, 6, 8]}
            px={[6, 6, 8, 6, 8, 13]}
            key={testimonialIndex}
          >
            <blockquote>
              <p>{quote}</p>
              <footer>{name}</footer>
            </blockquote>
          </AnimatedBox>
        )
      )}
    </Layout>
  );
};

export default Testimonials;

export const testimonialsPageQuery = graphql`
  query Testimonials {
    testimonials: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "testimonial" } } }
    ) {
      nodes {
        frontmatter {
          name
          quote
        }
      }
    }
  }
`;
