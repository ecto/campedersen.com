import React from 'react';
import {Link, graphql} from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  span {
    opacity: 0.64;
  }

  :hover {
    span {
      opacity: 1;
    }
  }
`;

export default ({data, location}) => {
  const posts = data.allMdx.edges;

  return (
    <Layout>
      {posts.map(({node}) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <Row key={node.fields.slug}>
            <Link to={node.fields.slug}>{title}</Link>
            <span>{node.frontmatter.date}</span>
          </Row>
        );
      })}
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          # excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
