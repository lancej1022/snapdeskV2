import React, { useState } from 'react';
import styled from 'styled-components';

import TicketCreator from '../ticketCreator';

const Feed = styled.section`
  height: 100%;
`;

const FeedGrid = styled.div`
  display: grid;
`;

const FeedContainer = () => {
  const [tickets, setTickets] = useState([]);

  return (
    <Feed>
      <FeedGrid></FeedGrid>
      <TicketCreator />
    </Feed>
  );
};

export default FeedContainer;
