module.exports = {
  siteMetadata: {
    title: 'Cam Pedersen',
    author: {
      name: 'Cam Pedersen',
      summary: 'goober',
    },
    description: 'Web3, Smart Contracts, React, TypeScript, Dachshunds',
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
        trackingId: 'UA-62763233-4',
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
        gatsbyRemarkPlugins: [
          'gatsby-remark-images',
          'gatsby-remark-prismjs',
          {
            resolve: `gatsby-remark-twitter-cards`,
            options: {
              title: '', // website title
              separator: '', // default
              author: 'Cam Pedersen',
              background: require.resolve('./assets/card-background.jpg'), // path to 1200x630px file or hex code, defaults to black (#000000)
              fontColor: '#000', // defaults to white (#ffffff)
              // titleFontSize: 96, // default
              // subtitleFontSize: 60, // default
              // fontStyle: 'monospace', // default
              fontFile: require.resolve('./assets/fonts/SpaceMono-Bold.ttf'), // will override fontStyle - path to custom TTF font
              // useFrontmatterSlug: false, // default, if true it will use the slug defined in the post frontmatter
            },
          },
        ],
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
