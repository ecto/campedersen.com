import React from 'react';
import {Link, graphql} from 'gatsby';
import styled from 'styled-components';
import {MDXProvider} from '@mdx-js/react';
import {MDXRenderer} from 'gatsby-plugin-mdx';

import Layout from './layout';

// Provide common components here
const shortcodes = {Link};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  h1 {
    margin-top: 0;
  }

  span {
    opacity: 0.64;
  }
`;

export default ({data, pageContext, location}) => (
  <Layout
    title={data.mdx.frontmatter.title}
    description={data.mdx.frontmatter.description || data.mdx.excerpt}
    pathname={location.pathname}
  >
    <Header>
      <h1>{data.mdx.frontmatter.title}</h1>
      <span>{data.mdx.frontmatter.date}</span>
    </Header>

    <MDXProvider components={shortcodes}>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </MDXProvider>
  </Layout>
);

export const pageQuery = graphql`
  # query BlogPostBySlug($slug: String!) {
  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: {eq: $id}) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
