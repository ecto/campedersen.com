import React, {useEffect, useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Link, useStaticQuery, graphql} from 'gatsby';
import Image from 'gatsby-image';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Space Mono', 'Courier New', monospace;
    font-size: 14px;
    font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h4 {
    font-family: 'Lora', serif;
    font-weight: normal;
  }

  :not(pre) > code[class*="language-"] {
    background: lightyellow;
    font-family: 'Space Mono', 'Courier New', monospace;
    color: #111;
  }
  pre[class*="language-"],
  :not(pre) > code[class*="language-"] {
    border: 0;
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
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64px;
`;

const FooterContainer = styled(HeaderContainer)`
  margin: 64px 0;
`;

const NavLink = styled.a`
  padding: 8px;
`;

const LargeEmoji = styled.span`
  font-size: 2.56em;
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

      <div>
        {LINKS.map((link) => (
          <NavLink target="_blank" href={link.url} key={link.url}>
            {link.name}
          </NavLink>
        ))}
      </div>
    </HeaderContainer>
  );
};

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <FooterContainer>
      {mounted && (
        <script
          defer
          data-uid="918babd8ed"
          src="https://proud-morning-6594.ck.page/918babd8ed/index.js"
        ></script>
      )}
      <LargeEmoji>
        <span role="img" aria-label="smile emoji">
          🙂
        </span>
      </LargeEmoji>
    </FooterContainer>
  );
};

export default ({location, title, children}) => (
  <Wrapper>
    <GlobalStyle />
    <Header />
    <main>{children}</main>
    <Footer />
  </Wrapper>
);
