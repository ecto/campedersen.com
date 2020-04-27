import React from 'react';
import {Link, graphql} from 'gatsby';
import styled from 'styled-components';
import {MDXProvider} from '@mdx-js/react';
import {MDXRenderer} from 'gatsby-plugin-mdx';

import Layout from './layout';
import SEO from './seo';

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

export default ({data, pageContext, location}) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <Header>
        <h1>{post.frontmatter.title}</h1>
        <span>{post.frontmatter.date}</span>
      </Header>

      <MDXProvider components={shortcodes}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  );
};

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
