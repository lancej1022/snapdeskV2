import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useByeQuery } from '../generated/apolloComponents';

import SideBar from '../components/sideBar';
import FeedContainer from '../components/feedContainer';
import TicketCreator from '../components/ticketCreator';

const HomeContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100vh;
`;

const Home = () => {
  // const { data, loading, error } = useByeQuery();
  const router = useRouter();

  return (
    <HomeContainer>
      <SideBar />
      <FeedContainer />
    </HomeContainer>
  );
};

export default Home;
