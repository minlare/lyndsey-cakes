import React from 'react';
import { graphql } from 'gatsby';
import { config, useSpring } from 'react-spring';
import Layout from '../components/layout';
import { AnimatedBox } from '../elements';
import SEO from '../components/SEO';

type PageProps = {
  data: {
    prices: {
      title: string;
      body: string;
    };
  };
};

const Prices: React.FunctionComponent<PageProps> = ({ data: { prices } }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <Layout>
      <SEO title={prices.title} desc="My prices" />
      <AnimatedBox
        style={pageAnimation}
        py={[6, 6, 6, 8]}
        px={[6, 6, 8, 6, 8, 13]}
      >
        <h1>{prices.title}</h1>
        <p>{prices.body}</p>
      </AnimatedBox>
    </Layout>
  );
};

export default Prices;

export const pricesPageQuery = graphql`
  query Prices {
    prices: pricesYaml {
      title
      body
    }
  }
`;
