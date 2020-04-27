module.exports = {
  siteMetadata: {
    title: 'Cam Pedersen',
    author: {
      name: 'Cam Pedersen',
      summary: 'goober',
    },
    description: 'a blog',
    siteUrl: 'https://campedersen.com/',
    social: {
      twitter: 'campedersen',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        //trackingId: 'ADD YOUR TRACKING ID HERE',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Cam Pedersen',
        short_name: 'Cam Pedersen',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000',
        display: 'minimal-ui',
        icon: 'assets/smile.png',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          posts: require.resolve('./src/components/post.js'),
        },
        gatsbyRemarkPlugins: ['gatsby-remark-images', 'gatsby-remark-prismjs'],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-feed-mdx',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
