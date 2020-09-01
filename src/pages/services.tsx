import React from 'react';
import { graphql } from 'gatsby';
import { config, useSpring } from 'react-spring';
import Layout from '../components/layout';
import { AnimatedBox } from '../elements';
import SEO from '../components/SEO';

type PageProps = {
  data: {
    services: {
      title: string;
      body: string;
    };
  };
};

const Services: React.FunctionComponent<PageProps> = ({
  data: { services }
}) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <Layout>
      <SEO title={services.title} desc="My services" />
      <AnimatedBox
        style={pageAnimation}
        py={[6, 6, 6, 8]}
        px={[6, 6, 8, 6, 8, 13]}
      >
        <h1>{services.title}</h1>
        <p>{services.body}</p>
      </AnimatedBox>
    </Layout>
  );
};

export default Services;

export const servicesPageQuery = graphql`
  query Services {
    services: servicesYaml {
      title
      body
    }
  }
`;
