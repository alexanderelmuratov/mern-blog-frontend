import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <span>&copy; {year} Developed with&nbsp;</span>
      <StyledHeart>❤</StyledHeart>
      <span>&nbsp;by&nbsp;</span>
      <StyledLink
        href="https://github.com/alexanderelmuratov"
        target="_blank"
        rel="noopener noreferrer"
      >
        Alexander Elmuratov
      </StyledLink>
    </StyledFooter>
  );
}

// ========== СТИЛИ ==========
const StyledFooter = styled.footer`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  margin-top: auto;
  background-color: #5f9ea0;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 250ms;
  &:hover {
    color: #f2552c;
  }
`;

const heartbeat = keyframes`
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
`;

const StyledHeart = styled.span`
  color: crimson;
  animation: ${heartbeat} 1500ms linear infinite;
`;
