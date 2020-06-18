import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useByeQuery } from '../generated/apolloComponents';

import SideBar from '../components/sideBar';
import LeaderBoard from '../components/leaderBoard';
import TicketCreator from '../components/ticketCreator';

const HomeContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100vh;
`;

const Home = () => {
  const { data, loading, error } = useByeQuery();
  const router = useRouter();

  if (loading) return <div>loading...</div>;
  if (error) {
    window.alert('Your session has timed out');
    router.push('/');
  }
  if (!data) return <div>no data...</div>;

  return (
    <HomeContainer>
      <SideBar />
      <div>
        hello
        <div>{data.bye}</div>
        <TicketCreator />
      </div>
      {/* <LeaderBoard /> */}
    </HomeContainer>
  );
};

export default Home;
