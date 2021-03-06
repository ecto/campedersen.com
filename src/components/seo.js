import React from 'react';
import Helmet from 'react-helmet';
import {useStaticQuery, graphql} from 'gatsby';
// import defaultMetaImage from '../../assets/spacetime.jpg';

export default ({description, lang = 'en', meta = [], title, pathname}) => {
  const {site} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
        # mdx {
        #   fields {
        #     socialcard
        #   }
        # }
      }
    `
  );

  // const image = `/${mdx?.fields?.socialcard || defaultMetaImage}`;
  const image = `${site.siteMetadata.siteUrl}${pathname}twitter-card.jpg`;
  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s - ${site.siteMetadata.title}`}
      defaultTitle={site.siteMetadata.title}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: 'image',
          content: image,
        },
        {
          name: 'og:image',
          content: image,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:image',
          content: image,
        },
      ].concat(meta)}
    />
  );
};
