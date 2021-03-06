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

  const image = `${site.siteMetadata.siteUrl}${pathname}twitter-card.jpg`;
  const metaDescription = description || site.siteMetadata.description;
  const metaTitle = title || site.siteMetadata.title;

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
          content: metaTitle,
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
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:image',
          content: image,
        },
        {
          name: 'image',
          content: image,
        },
        {
          name: 'og:image',
          content: image,
        },
      ].concat(meta)}
    />
  );
};
