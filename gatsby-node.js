// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = (promise) =>
  promise.then((result) => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const cakeTemplate = require.resolve('./src/templates/cake.tsx');

  const result = await wrapper(
    graphql(`
      {
        cakes: allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "cake-page" } } }
        ) {
          nodes {
            frontmatter {
              slug
            }
          }
        }
      }
    `)
  );

  result.data.cakes.nodes.forEach((node) => {
    createPage({
      path: node.frontmatter.slug,
      component: cakeTemplate,
      context: {
        slug: node.frontmatter.slug
      }
    });
  });
};

// exports.onCreateNode = ({
//   node,
//   getNode,
//   loadNodeContent,
//   boundActionCreators,
// }) => {
//   const { frontmatter } = node
//   if (frontmatter) {
//     const { image } = frontmatter
//     if (image) {
//       if (image.indexOf('/img') === 0) {
//         frontmatter.image = path.relative(
//           path.dirname(node.fileAbsolutePath),
//           path.join(__dirname, '/static/', image)
//         )
//       }
//     }
//   }
// }
