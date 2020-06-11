import React from 'react';
import styled from 'styled-components';

import { useByeQuery } from '../../generated/graphql';

import SideBar from '../../components/sideBar';
import LeaderBoard from '../../components/leaderBoard';

const HomeContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  height: 100vh;
`;

const Home: React.FC = () => {
  const { data, loading, error } = useByeQuery();

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!data) return <div>no data...</div>;
  console.log(data);

  return (
    <HomeContainer>
      <SideBar />
      <div>
        hello
        <div>{data.bye}</div>
      </div>
      <LeaderBoard />
    </HomeContainer>
  );
};

export default Home;
