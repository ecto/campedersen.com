import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Link, useStaticQuery, graphql} from 'gatsby';
import Image from 'gatsby-image';
import SEO from './seo';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Space Mono', 'Courier New', monospace;
    font-size: 14px;
    font-smoothing: antialiased;
    font-variant-ligatures: none;
  }

  h1, h2, h3, h4, h4 {
    font-family: 'Lora', serif;
    font-weight: normal;
  }

  pre {
    font-variant-ligatures: none;
  }
  :not(pre) > code[class*="language-"] {
    font-family: 'Space Mono', 'Courier New', monospace;
    background: rgba(0, 0, 0, 0.08);
    color: rbga(0, 0, 0, 1);
  }
  pre[class*="language-"],
  :not(pre) > code[class*="language-"] {
    border: 0;
  }

  pre[class*="language-"] {
    background: rgba(0, 0, 0, 0.02);
  }
  pre[class*="language-"] > code {
    font-family: 'Space Mono', 'Courier New', monospace;
    background: none;
  }
`;

const Avatar = styled(Image)`
  border-radius: 64px;
  margin-bottom: 32px;
`;

const Wrapper = styled.div`
  max-width: 640px;
  padding: 32px 16px;
  margin: 0 auto;

  img,
  video {
    max-width: 100%;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64px;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterContainer = styled(HeaderContainer)`
  margin: 64px 0;
`;

const NavLink = styled.a`
  padding: 8px;
`;

const LargeEmoji = styled.span`
  font-size: 2.56em;
  span {
    padding: 2px;
  }
`;

const LINKS = [
  {
    name: 'Consulting',
    url: 'https://emerald.io',
  },

  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/cam-pedersen/',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/campedersen',
  },
  {
    name: 'Github',
    url: 'https://github.com/ecto',
  },
  {
    name: 'Email',
    url: 'mailto:cam@campedersen.com',
  },
];

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      avatar: file(absolutePath: {regex: "/profile-pic.jpg/"}) {
        childImageSharp {
          fixed(width: 128, height: 128) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `);

  return (
    <HeaderContainer>
      <Link to="/">
        <Avatar
          fixed={data.avatar.childImageSharp.fixed}
          alt={data.site.siteMetadata.author.name}
        />
      </Link>

      <LinkContainer>
        {LINKS.map((link) => (
          <NavLink target="_blank" href={link.url} key={link.url}>
            {link.name}
          </NavLink>
        ))}
      </LinkContainer>
    </HeaderContainer>
  );
};

const Footer = () => (
  <FooterContainer>
    <LargeEmoji>
      <span role="img" aria-label="smile emoji">
        🙂
      </span>
    </LargeEmoji>
  </FooterContainer>
);

export default ({title, description, children, pathname}) => (
  <Wrapper>
    <SEO title={title} description={description} pathname={pathname} />
    <GlobalStyle />
    <Header />
    <main>{children}</main>
    <Footer />
  </Wrapper>
);
