import React from 'react';
import { graphql } from 'gatsby';
import { config, useSpring } from 'react-spring';
import Layout from '../components/layout';
import { AnimatedBox } from '../elements';
import SEO from '../components/SEO';

type PageProps = {
  data: {
    about: {
      title: string;
      metaDescription: string;
      body: string;
    };
  };
};

const About: React.FunctionComponent<PageProps> = ({ data: { about } }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <Layout>
      <SEO title={about.title} desc={about.metaDescription} />
      <AnimatedBox
        style={pageAnimation}
        py={[6, 6, 6, 8]}
        px={[6, 6, 8, 6, 8, 13]}
      >
        <h1>{about.title}</h1>
        <p>{about.body}</p>
      </AnimatedBox>
    </Layout>
  );
};

export default About;

export const aboutPageQuery = graphql`
  query About {
    about: aboutYaml {
      title
      metaDescription
      body
    }
  }
`;
