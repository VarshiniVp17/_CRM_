import React from 'react';
import styled from 'styled-components';
import { FaTools } from 'react-icons/fa';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: white;
  color: black;
  font-family: 'Arial', sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0.5rem 0;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const Spinner = styled.div`
  margin: 2rem 0;
  border: 5px solid rgba(255, 255, 255, 0.2);
  border-top: 5px solid black;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Icon = styled(FaTools)`
  font-size: 4rem;
  margin: 1rem 0;
`;

const Footer = styled.footer`
  margin-top: 2rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const UnderConstruction = () => {
  return (
    <PageWrapper>
      <Icon />
      <Title>🚧 Page Under Construction 🚧</Title>
      <Subtitle>We're currently working on this page. Will be Loaded soon!</Subtitle>
      <Spinner />
      <Footer>&copy; SRM Technologies.</Footer>
    </PageWrapper>
  );
};

export default UnderConstruction;
