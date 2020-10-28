import { graphql } from 'gatsby';

export { default } from '../components/templates/cakes';

export const query = graphql`
  query Cupcakes {
    cakes: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "cake-page" }, category: { eq: "cupcakes" } } }
    ) {
      nodes {
        frontmatter {
          slug
          title
          price
          featuredimage {
            childImageSharp {
              fluid(quality: 95, maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
