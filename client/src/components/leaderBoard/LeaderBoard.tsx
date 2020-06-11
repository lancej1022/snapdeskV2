import React from 'react';
import styled from 'styled-components';

const LeaderBoardContainer = styled.section`
  background-color: ${({ theme }) => theme.colorDark};
  padding: 2rem;
  color: white;
  text-align: center;

  h3 {
    color: ${({ theme }) => theme.colorLight};
    font-size: 3.5rem;
  }
`;

const RankingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;

  p {
    color: ${({ theme }) => theme.textWhite};
  }
`;

const LeaderBoard = () => {
  return (
    <LeaderBoardContainer>
      <h3>Active Tickets</h3>
      <h4>12</h4>
      <h3>LeaderBoard</h3>
      <RankingContainer>
        <p>Ranking</p>
        <p>Mentor Name</p>
        <p>Snaps Earned</p>
      </RankingContainer>
    </LeaderBoardContainer>
  );
};

export default LeaderBoard;
